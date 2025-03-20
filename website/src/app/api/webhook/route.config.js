// This is a special configuration file for the webhook route
// It ensures that Vercel handles the request properly without automatic body parsing

export const config = {
  // Use Node.js runtime
  runtime: 'nodejs',
  
  // Don't cache responses
  api: {
    // Disable automatic body parsing
    bodyParser: false,
  },
}; 