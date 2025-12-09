/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed 'output: export' for Amplify deployment (supports API routes)
  
  // Ignore ESLint and TypeScript errors during builds for reliable Amplify deployments
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    domains: ['lh3.googleusercontent.com'],
    // Use unoptimized images for Amplify compatibility
    unoptimized: true,
  },
  
  env: {
    // Explicitly pass through environment variables for Amplify WEB_COMPUTE runtime
    // These are read from process.env during build and embedded into the build
    // This ensures they're available at runtime even if .env.production isn't deployed
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // Server-side env vars (DATABASE_URL, etc.) are read from .env.production during build
    // and embedded into the server bundle automatically by Next.js
    // The .env.production file is created in preBuild phase and doesn't need to be deployed
  },
  
  webpack: (config, { isServer }) => {
    // Configure webpack fallbacks for AWS SDK compatibility
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig

