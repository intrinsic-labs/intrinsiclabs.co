import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia', // Use the latest API version
});

// Configure the runtime to handle webhooks
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('Webhook endpoint hit');
  
  try {
    // Get the raw request body as text
    const payload = await req.text();
    console.log('Received payload length:', payload.length);
    
    // Check if this is a test request
    const isTestMode = req.headers.get('x-stripe-test') === 'true';
    
    const signature = req.headers.get('stripe-signature');
    console.log('Signature present:', !!signature);
    
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log('Endpoint secret configured:', !!endpointSecret);

    let event;

    // For test mode, parse the event directly from the payload
    if (isTestMode) {
      console.log('Running in test mode - bypassing signature verification');
      try {
        event = JSON.parse(payload);
        console.log('Test event parsed successfully:', event.type);
      } catch (err) {
        const error = err as Error;
        console.error(`⚠️ Error parsing test event: ${error.message}`);
        return new NextResponse(`Test Event Error: ${error.message}`, { status: 400 });
      }
    } else {
      // Normal mode - verify signature
      if (!signature || !endpointSecret) {
        console.error('Missing signature or endpoint secret');
        return new NextResponse('Missing signature or endpoint secret', { status: 400 });
      }

      try {
        // Construct the event from the raw payload
        event = stripe.webhooks.constructEvent(
          payload,
          signature,
          endpointSecret
        );
        console.log('Event constructed successfully:', event.type);
      } catch (err) {
        const error = err as Error;
        console.error(`⚠️ Webhook signature verification failed: ${error.message}`);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
      }
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log(`Processing ${event.type} event`);
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Session mode: ${session.mode}`);
        
        // For subscription checkouts, we'll skip as we'll process them via invoice.payment_succeeded
        if (session.mode === 'subscription') {
          console.log('Skipping subscription checkout session to avoid double counting');
          return new NextResponse(JSON.stringify({ received: true, status: 'skipped_subscription_checkout' }), { 
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        
        // For one-time payments we'll process here, but use the payment_intent id for consistency
        // This helps with deduplication if payment_intent.succeeded also fires
        if (session.payment_intent) {
          const paymentId = typeof session.payment_intent === 'string' 
            ? session.payment_intent 
            : session.payment_intent.id;
          
          console.log(`Payment ID from checkout session: ${paymentId}`);
          await processDonation(paymentId, event.type, session, false);
        } else {
          // If there's no payment_intent (unusual), fall back to session ID
          console.log(`No payment_intent found, using session ID: ${session.id}`);
          await processDonation(session.id, event.type, session, false);
        }
        break;
      }
      
      case 'payment_intent.succeeded': {
        console.log(`Processing ${event.type} event`);
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Get metadata to check if this is a subscription payment
        const metadata = paymentIntent.metadata || {};
        const isSubscription = 
          ('subscription_details' in paymentIntent && paymentIntent.subscription_details !== null) ||
          paymentIntent.invoice !== null;
        
        if (isSubscription) {
          // For subscriptions, we prefer to handle them via invoice.payment_succeeded
          // This check helps avoid double counting subscription payments
          console.log('This appears to be a subscription payment, checking if already processed...');
          
          const { data: existingDonation } = await supabase
            .from('donations')
            .select('id')
            .eq('payment_id', paymentIntent.id)
            .maybeSingle();
          
          if (existingDonation) {
            console.log(`Subscription payment ${paymentIntent.id} already recorded, skipping`);
            return new NextResponse(JSON.stringify({ received: true, status: 'skipped_duplicate_subscription' }), { 
              status: 200,
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
          
          // If it hasn't been processed yet, we'll process it
          // But we'll set a flag so we know it came from payment_intent event
          console.log('Processing subscription payment from payment_intent event');
          await processDonation(paymentIntent.id, event.type, paymentIntent, true, true);
        } else {
          // For one-time payments, just process normally
          console.log('Processing one-time payment intent');
          await processDonation(paymentIntent.id, event.type, paymentIntent, false);
        }
        break;
      }
      
      case 'invoice.payment_succeeded': {
        // This is the preferred event for recurring subscription payments
        console.log('Processing invoice payment');
        const invoice = event.data.object as Stripe.Invoice;
        
        // Only process if this is a subscription invoice
        if (invoice.subscription) {
          const paymentId = invoice.payment_intent as string;
          console.log(`Subscription payment ID from invoice: ${paymentId}`);
          
          // Mark as recurring and use the payment_intent ID for consistent deduplication
          await processDonation(paymentId, event.type, invoice, true);
        } else {
          console.log('Non-subscription invoice, skipping');
        }
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    console.log('Returning success response');
    return new NextResponse(JSON.stringify({ received: true }), { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// Helper function to process donation and avoid duplicate code
async function processDonation(
  paymentId: string, 
  eventType: string, 
  paymentData: Stripe.PaymentIntent | Stripe.Checkout.Session | Stripe.Invoice,
  isRecurring: boolean,
  fromPaymentIntent: boolean = false
) {
  console.log(`Processing donation with ID: ${paymentId}, event: ${eventType}, recurring: ${isRecurring}`);
  
  // Check if this payment has already been recorded
  const { data: existingDonation } = await supabase
    .from('donations')
    .select('id, payment_id, payment_type')
    .eq('payment_id', paymentId)
    .maybeSingle();
    
  if (existingDonation) {
    console.log(`Payment ${paymentId} already recorded as ${existingDonation.payment_type}, skipping`);
    return;
  }
  
  // Extract amount based on payment data type
  let amount: number | null = null;
  let customerId: string | null = null;
  
  if ('amount' in paymentData) {
    // For payment intents
    amount = paymentData.amount;
    customerId = paymentData.customer as string;
  } else if ('amount_total' in paymentData) {
    // For checkout sessions
    amount = paymentData.amount_total;
    customerId = paymentData.customer as string;
  } else if ('amount_paid' in paymentData) {
    // For invoices
    amount = paymentData.amount_paid;
    customerId = paymentData.customer as string;
  }
  
  if (amount) {
    // Convert from cents to dollars
    const amountInDollars = amount / 100;
    console.log(`Amount: ${amountInDollars} from ${amount} cents`);
    console.log(`Is recurring: ${isRecurring}`);
    
    // Create base donation object with required fields
    const donationData: any = {
      amount: amountInDollars,
      payment_id: paymentId,
      payment_type: eventType,
      is_recurring: isRecurring,
      status: 'confirmed' // Setting this to confirmed for tests
    };
    
    // Only add optional fields if they're set up in the database
    try {
      // Insert donation into Supabase
      console.log('Inserting into Supabase...');
      const { error } = await supabase
        .from('donations')
        .insert([donationData]);
      
      if (error) {
        console.error('Error inserting donation data:', error);
      } else {
        console.log(`Donation of $${amountInDollars} recorded successfully!`);
      }
    } catch (error) {
      console.error('Failed to insert donation:', error);
    }
  } else {
    console.log('Could not determine amount for this payment');
  }
} 