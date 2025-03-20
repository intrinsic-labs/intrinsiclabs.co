// You'd typically replace this with a real DB or API call
// This is just a simplified example
import { supabase } from './supabase';

export async function getFundingData() {
  try {
    // Fetch the total donations from Supabase
    const { data, error } = await supabase
      .from('donations')
      .select('amount')
      .eq('status', 'confirmed');
    
    if (error) {
      console.error('Failed to fetch funding data:', error);
      throw error;
    }
    
    // Calculate the total amount donated
    const totalDonated = data?.reduce((sum, donation) => sum + donation.amount, 0) || 0;
    
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