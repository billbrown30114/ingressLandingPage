# AWS S3 Static Website Deployment Guide

This guide explains how to deploy the Next.js application as a static Single Page Application (SPA) to AWS S3.

## Prerequisites

1. AWS CLI installed and configured with appropriate credentials
2. Node.js and npm installed
3. AWS account with S3 permissions

## Important Notes

⚠️ **API Routes Limitation**: This application includes API routes (`/api/*`) that require a backend server. When deployed as a static SPA to S3, these routes will not work. Pages that depend on API routes (like `/schedule` and `/admin`) will need to be updated to use external API endpoints or removed.

⚠️ **Server-Side Features**: The `/admin` page uses `getServerSession` which requires a server. This page will not work in static export. Consider:
- Removing the admin page for static deployment
- Moving authentication to client-side only
- Deploying admin separately with server support

⚠️ **Dynamic Routes**: Ensure all routes can be statically generated. Check for:
- `getServerSession` or other server-side functions
- Database queries in page components
- API route dependencies

## Deployment Steps

### 1. Build the Static Site

```bash
npm run build:static
```

This creates an `out/` directory with all static files.

### 2. Create S3 Bucket

```bash
chmod +x scripts/setup-s3-bucket.sh
./scripts/setup-s3-bucket.sh your-bucket-name us-east-1
```

Replace `your-bucket-name` with your desired bucket name (must be globally unique).

### 3. Deploy to S3 (with automatic CloudFront setup)

```bash
chmod +x scripts/deploy-to-s3.sh
./scripts/deploy-to-s3.sh your-bucket-name us-east-1
```

The script will automatically:
- Create the S3 bucket if it doesn't exist
- Configure it for static website hosting
- Create a CloudFront distribution if one doesn't exist
- Deploy your files
- Invalidate CloudFront cache

**Note**: CloudFront creation requires `jq`. Install with:
- macOS: `brew install jq`
- Linux: `apt-get install jq` or `yum install jq`

To skip CloudFront setup:
```bash
./scripts/deploy-to-s3.sh your-bucket-name us-east-1 --no-cloudfront
```

To use an existing CloudFront distribution:
```bash
./scripts/deploy-to-s3.sh your-bucket-name us-east-1 --distribution-id <your-distribution-id>
```

## Quick Deploy (All-in-One)

The simplest way - everything is automated:

```bash
# Build and deploy (creates bucket and CloudFront automatically)
npm run build:static
./scripts/deploy-to-s3.sh your-bucket-name us-east-1
```

Or use the complete deployment script:

```bash
# First time setup
./scripts/deploy.sh your-bucket-name us-east-1 --setup-bucket --create-cloudfront

# Subsequent deployments
./scripts/deploy.sh your-bucket-name us-east-1
```

**What happens automatically:**
1. S3 bucket is created if it doesn't exist
2. Bucket is configured for static website hosting
3. CloudFront distribution is created if one doesn't exist
4. Files are deployed to S3
5. CloudFront cache is invalidated

## Environment Variables

For static export, only `NEXT_PUBLIC_*` environment variables are available at build time. Make sure to set these before building:

```bash
export NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
npm run build:static
```

## Custom Domain Setup

1. Create CloudFront distribution (see step 4 above)
2. Request SSL certificate in AWS Certificate Manager (ACM)
3. Update CloudFront distribution to use the certificate
4. Add CNAME record in your DNS pointing to CloudFront domain

## Troubleshooting

### Build Fails
- Ensure all pages can be statically generated
- Remove or mock API route dependencies
- Check for dynamic routes that need `generateStaticParams`

### 404 Errors on Refresh
- Ensure CloudFront is configured with custom error responses (404 → index.html)
- Or use S3 website endpoint (not REST API endpoint)

### CORS Issues
- Check S3 bucket CORS configuration
- Verify CloudFront origin settings

## File Structure After Build

```
out/
├── index.html
├── about/
│   └── index.html
├── _next/
│   ├── static/
│   └── ...
└── ...
```

All files in `out/` are uploaded to S3 root.
