// You'd typically replace this with a real DB or API call
// This is just a simplified example
import { supabase } from './supabase';

export async function getFundingData() {
  try {
    // Fetch all confirmed donations from Supabase
    const { data, error } = await supabase
      .from('donations')
      .select('payment_id, amount, is_recurring')
      .eq('status', 'confirmed');
    
    if (error) {
      console.error('Failed to fetch funding data:', error);
      throw error;
    }
    
    // Use a Map to ensure we only count each payment_id once
    // This handles the case of duplicate webhook events for the same payment
    const uniqueDonations = new Map();
    
    // Process each donation, keeping only the unique ones by payment_id
    if (data) {
      data.forEach(donation => {
        // If this payment_id hasn't been seen or if current amount is greater, use it
        // This handles cases where partial payments might be recorded
        if (!uniqueDonations.has(donation.payment_id) || 
            uniqueDonations.get(donation.payment_id).amount < donation.amount) {
          uniqueDonations.set(donation.payment_id, donation);
        }
      });
    }
    
    // Calculate the total amount from unique donations
    const totalDonated = Array.from(uniqueDonations.values())
      .reduce((sum, donation) => sum + donation.amount, 0);
    
    // Define the funding goal
    const goal = 12000;
    
    // Calculate the percentage of the goal reached
    const percentage = (totalDonated / goal) * 100;
    
    return {
      current: Math.round(totalDonated), // Round to nearest dollar
      goal,
      percentage: Math.min(100, percentage) // Cap at 100%
    };
  } catch (error) {
    console.error('Failed to fetch funding data:', error);
    
    // Return default values if there's an error
    return {
      current: 0,
      goal: 12000,
      percentage: 0
    };
  }
} 