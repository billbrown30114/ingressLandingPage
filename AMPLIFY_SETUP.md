# AWS Amplify Deployment Guide

This guide explains how to deploy the Next.js application to AWS Amplify with full API route and database support.

## Prerequisites

1. AWS Account with Amplify access
2. AWS CLI configured with appropriate credentials
3. GitHub repository (or other supported Git provider)
4. RDS PostgreSQL database instance

## Step 1: Install Amplify CLI (if not already installed)

```bash
npm install -g @aws-amplify/cli
```

## Step 2: Initialize Amplify App

```bash
amplify init
```

Follow the prompts:
- **Project name**: `landing-page` (or your preferred name)
- **Environment**: `dev` (or `production`)
- **Default editor**: Your preferred editor
- **App type**: `javascript`
- **Framework**: `react`
- **Source directory**: `.`
- **Distribution directory**: `.next`
- **Build command**: `npm run build`
- **Start command**: `npm start`

## Step 3: Add Environment Variables in Amplify Console

Go to AWS Amplify Console → Your App → Environment variables and add:

### Required Variables:

```
DATABASE_URL=postgresql://USERNAME:PASSWORD@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/DATABASE_NAME?schema=public&sslmode=require
NEXTAUTH_URL=https://your-amplify-domain.amplifyapp.com
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### Optional Variables (if using Gmail OAuth):

```
GMAIL_CLIENT_ID=your-gmail-client-id
GMAIL_CLIENT_SECRET=your-gmail-client-secret
GMAIL_REFRESH_TOKEN=your-refresh-token
GOOGLE_SERVICE_ACCOUNT_KEY=your-service-account-json
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 4: Connect Repository

### Option A: Via Amplify Console (Recommended)

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Select your Git provider (GitHub, GitLab, Bitbucket, etc.)
4. Authorize and select your repository
5. Configure build settings (amplify.yml is already configured)
6. Review and deploy

### Option B: Via Amplify CLI

```bash
amplify add hosting
amplify publish
```

## Step 5: Configure RDS Security Group

Ensure your RDS security group allows inbound connections from Amplify:

1. Go to AWS RDS Console → Your database → Connectivity & security
2. Click on the security group
3. Edit inbound rules
4. Add rule:
   - Type: PostgreSQL
   - Port: 5432
   - Source: Amplify IP ranges (or use VPC peering)

**Note**: For production, consider using VPC peering or AWS PrivateLink for secure database access.

## Step 6: Update OAuth Redirect URIs

Update your Google OAuth redirect URIs to include your Amplify domain:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URI:
   ```
   https://your-amplify-domain.amplifyapp.com/api/auth/callback/google
   ```

## Step 7: Deploy

### Via Console:
- Push to your Git repository
- Amplify will automatically build and deploy

### Via CLI:
```bash
amplify publish
```

## Build Configuration

The `amplify.yml` file is already configured with:
- Prisma client generation
- Next.js build
- Proper caching

## Environment-Specific Configuration

For different environments (dev/staging/production):

1. Go to Amplify Console → App settings → Environment variables
2. Set different values for each branch/environment
3. Use branch-specific variables as needed

## Troubleshooting

### Build Fails - Prisma Issues
- Ensure `DATABASE_URL` is set correctly
- Check that Prisma can connect during build (may need to allow Amplify IPs)

### Database Connection Errors
- Verify RDS security group allows Amplify IPs
- Check `DATABASE_URL` format (URL-encode special characters)
- Ensure SSL mode is set if required

### API Routes Not Working
- Verify `NEXTAUTH_URL` matches your Amplify domain
- Check that environment variables are set correctly
- Review Amplify build logs for errors

### OAuth Callbacks Failing
- Ensure redirect URI matches exactly (including https://)
- Check `NEXTAUTH_SECRET` is set
- Verify Google OAuth credentials are correct

## Custom Domain Setup

1. Go to Amplify Console → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to match your custom domain

## Monitoring

- View build logs in Amplify Console
- Monitor function logs in CloudWatch
- Check RDS connection metrics

## Cost Considerations

- Amplify hosting: Pay per build and data transfer
- RDS: Pay for database instance
- Lambda (if using): Pay per invocation
