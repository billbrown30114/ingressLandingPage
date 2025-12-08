/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed 'output: export' for Amplify deployment (supports API routes)
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    // Explicitly pass through environment variables for Amplify WEB_COMPUTE runtime
    // These are read from process.env during build and embedded into the build
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // Note: Server-side env vars (DATABASE_URL, etc.) are read from .env.production
    // during build and embedded into the server bundle automatically by Next.js
  },
}

module.exports = nextConfig

