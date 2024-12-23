// Environment configuration with validation
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321',  // Default to local Supabase
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key-for-development',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Validate environment in production
if (env.isProduction) {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error('Missing required environment variables in production');
  }
}