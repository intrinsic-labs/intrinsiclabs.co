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

    // Handle the event
    if (event.type === 'payment_intent.succeeded' || 
        event.type === 'checkout.session.completed') {
      
      console.log(`Processing ${event.type} event`);
      const paymentData = event.data.object as Stripe.PaymentIntent | Stripe.Checkout.Session;
      const amount = 'amount' in paymentData ? paymentData.amount : paymentData.amount_total;
      
      if (amount) {
        // Convert from cents to dollars
        const amountInDollars = amount / 100;
        console.log(`Amount: ${amountInDollars} from ${amount} cents`);
        
        // Insert donation into Supabase
        console.log('Inserting into Supabase...');
        const { error } = await supabase
          .from('donations')
          .insert([
            { 
              amount: amountInDollars,
              payment_id: paymentData.id,
              payment_type: event.type
            }
          ]);
        
        if (error) {
          console.error('Error inserting donation data:', error);
        } else {
          console.log(`Donation of $${amountInDollars} recorded successfully!`);
        }
      }
    } else {
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