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
    
    const signature = req.headers.get('stripe-signature');
    console.log('Signature present:', !!signature);
    
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log('Endpoint secret configured:', !!endpointSecret);

    if (!signature || !endpointSecret) {
      console.error('Missing signature or endpoint secret');
      return new NextResponse('Missing signature or endpoint secret', { status: 400 });
    }

    let event;

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

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
      case 'checkout.session.completed': {
        console.log(`Processing ${event.type} event`);
        const paymentData = event.data.object as Stripe.PaymentIntent | Stripe.Checkout.Session;
        
        // Extract payment ID - it will be different depending on the event type
        let paymentId: string;
        if (event.type === 'payment_intent.succeeded') {
          paymentId = paymentData.id;
        } else {
          // For checkout.session.completed, get the payment_intent if available
          paymentId = 'payment_intent' in paymentData && paymentData.payment_intent
            ? (typeof paymentData.payment_intent === 'string' 
                ? paymentData.payment_intent 
                : paymentData.payment_intent.id)
            : paymentData.id;
        }
        
        console.log(`Payment ID: ${paymentId}`);
        
        await processDonation(paymentId, event.type, paymentData);
        break;
      }
      
      case 'invoice.payment_succeeded': {
        // This captures both initial and recurring subscription payments
        console.log('Processing subscription payment');
        const invoice = event.data.object as Stripe.Invoice;
        
        // Only process if this is a subscription invoice (not a one-time invoice)
        if (invoice.subscription) {
          const paymentId = invoice.payment_intent as string;
          console.log(`Subscription payment ID: ${paymentId}`);
          
          // Only process if this is for a subscription (not another type of invoice)
          if (invoice.subscription) {
            await processDonation(paymentId, event.type, invoice);
          }
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
  paymentData: Stripe.PaymentIntent | Stripe.Checkout.Session | Stripe.Invoice
) {
  // Check if this payment has already been recorded
  const { data: existingDonation } = await supabase
    .from('donations')
    .select('id')
    .eq('payment_id', paymentId)
    .maybeSingle();
    
  if (existingDonation) {
    console.log(`Payment ${paymentId} already recorded, skipping`);
    return;
  }
  
  // Extract amount based on payment data type
  let amount: number | null = null;
  
  if ('amount' in paymentData) {
    // For payment intents
    amount = paymentData.amount;
  } else if ('amount_total' in paymentData) {
    // For checkout sessions
    amount = paymentData.amount_total;
  } else if ('amount_paid' in paymentData) {
    // For invoices
    amount = paymentData.amount_paid;
  }
  
  if (amount) {
    // Convert from cents to dollars
    const amountInDollars = amount / 100;
    console.log(`Amount: ${amountInDollars} from ${amount} cents`);
    
    // Determine if recurring based on event type
    const isRecurring = eventType === 'invoice.payment_succeeded';
    
    // Insert donation into Supabase
    console.log('Inserting into Supabase...');
    const { error } = await supabase
      .from('donations')
      .insert([
        { 
          amount: amountInDollars,
          payment_id: paymentId,
          payment_type: eventType,
          is_recurring: isRecurring
        }
      ]);
    
    if (error) {
      console.error('Error inserting donation data:', error);
    } else {
      console.log(`Donation of $${amountInDollars} recorded successfully!`);
    }
  } else {
    console.log('Could not determine amount for this payment');
  }
} 