# Fixing Duplicate Subscription Data

Based on your current table data, you need to:

1. Update the recurring flag for subscription payments
2. Fix the duplicate entries from the initial subscription setup

## 1. Update the Subscription Recurring Flag

Run this SQL in your Supabase SQL Editor to mark subscription payments as recurring:

```sql
-- Update subscription payments based on payment_id pattern
UPDATE donations
SET is_recurring = true
WHERE payment_id IN (
  'pi_3R4cScH251RYgOiq0B4ofGJ7',  -- Update with your specific subscription payment_id
  'cs_live_a1poJtX8l8qxNWjHZEFhEUymzoSCSNQWILVVWLzLws6TAOwnK7a0bEm0sV'  -- Update with your specific subscription checkout_id
);
```

## 2. Handle Duplicate Subscription Payments

Based on your data, you have duplicate entries for each subscription payment (a checkout.session and a payment_intent for the same transaction). 

The best approach is to decide which one to keep:

```sql
-- Option 1: Keep only the payment_intent.succeeded entries
DELETE FROM donations
WHERE payment_type = 'checkout.session.completed'
AND amount = 5;  -- Adjust this to match your subscription amount

-- Option 2: Keep only checkout.session.completed entries
DELETE FROM donations
WHERE payment_type = 'payment_intent.succeeded'
AND amount = 5;  -- Adjust this to match your subscription amount
```

Choose one of these options based on your preference. After making these changes, your fundraising total should accurately reflect the actual donations without duplicates.

## Future Data Structure

With our updated webhook handler, future subscription payments will be handled correctly:
- Initial subscription payment will be processed only once (not twice)
- All subscription payments will have `is_recurring = true`
- Renewal payments will be captured via the `invoice.payment_succeeded` event

You can monitor the webhook behavior in the Stripe Dashboard under "Developers > Webhooks > Events". 