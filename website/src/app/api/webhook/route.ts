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
  // Get the raw request body as a buffer
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') || '';
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event;

  try {
    // Construct the event from the raw payload
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret
    );
  } catch (err) {
    const error = err as Error;
    console.error(`⚠️ Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded' || 
      event.type === 'checkout.session.completed') {
    
    const paymentData = event.data.object as Stripe.PaymentIntent | Stripe.Checkout.Session;
    const amount = 'amount' in paymentData ? paymentData.amount : paymentData.amount_total;
    
    if (amount) {
      // Convert from cents to dollars
      const amountInDollars = amount / 100;
      
      // Insert donation into Supabase
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
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
} 