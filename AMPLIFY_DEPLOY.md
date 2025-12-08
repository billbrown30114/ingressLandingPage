# AWS Amplify Deployment Guide

This guide walks you through deploying your Next.js application to AWS Amplify with full API route and database support.

## Prerequisites

1. AWS Account with Amplify access
2. GitHub/GitLab/Bitbucket repository (or AWS CodeCommit)
3. RDS PostgreSQL database instance
4. AWS CLI configured with `ingress` profile

## Quick Deploy via Amplify Console

### Step 1: Connect Repository

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select your Git provider (GitHub, GitLab, Bitbucket, etc.)
4. Authorize and select your repository: `landingPage`
5. Click **"Next"**

### Step 2: Configure Build Settings

Amplify will auto-detect `amplify.yml`. Verify these settings:

- **App name**: `ingress-software-landing` (or your preferred name)
- **Environment**: `main` (or your default branch)
- **Build settings**: Use `amplify.yml` (already configured)

Click **"Next"**.

### Step 3: Add Environment Variables

Add these environment variables in the Amplify Console:

#### Required Variables:

```
DATABASE_URL=postgresql://USERNAME:PASSWORD@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/DATABASE_NAME?schema=public&sslmode=require
NEXTAUTH_URL=https://your-app-id.amplifyapp.com
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

#### Optional Variables (for Gmail/Email):

```
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

#### Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

### Step 4: Review and Deploy

1. Review all settings
2. Click **"Save and deploy"**
3. Wait for the build to complete (5-10 minutes)

## Deploy via Amplify CLI

### Step 1: Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

### Step 2: Configure Amplify CLI

```bash
amplify configure
```

Follow the prompts to set up your AWS credentials.

### Step 3: Initialize Amplify App

```bash
amplify init
```

Follow the prompts:
- **Project name**: `ingress-software-landing`
- **Environment**: `dev` (or `production`)
- **Default editor**: Your preferred editor
- **App type**: `javascript`
- **Framework**: `react`
- **Source directory**: `.`
- **Distribution directory**: `.next`
- **Build command**: `npm run build`
- **Start command**: `npm start`

### Step 4: Add Environment Variables

```bash
amplify env add
```

Or add them in the Amplify Console under **App settings** → **Environment variables**.

### Step 5: Deploy

```bash
amplify publish
```

## Post-Deployment Steps

### 1. Update NEXTAUTH_URL

After deployment, update `NEXTAUTH_URL` in Amplify Console to match your actual domain:
- Go to **App settings** → **Environment variables**
- Update `NEXTAUTH_URL` to: `https://your-app-id.amplifyapp.com`

### 2. Update Google OAuth Redirect URI

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add authorized redirect URI: `https://your-app-id.amplifyapp.com/api/auth/callback/google`

### 3. Run Database Migrations

If you need to run migrations:

```bash
# Connect to your RDS instance
psql -h tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com -U USERNAME -d DATABASE_NAME

# Or use Prisma
npm run db:push
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Your Amplify app URL | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Public Google Client ID | Yes |
| `SMTP_USER` | Email for sending notifications | No |
| `SMTP_PASSWORD` | Email password/app password | No |
| `SMTP_HOST` | SMTP server hostname | No |
| `SMTP_PORT` | SMTP server port | No |

## Troubleshooting

### Build Fails: Prisma Client Not Generated

Ensure `npx prisma generate` runs in the preBuild phase (already in `amplify.yml`).

### Build Fails: Database Connection

- Verify `DATABASE_URL` is correct
- Check RDS security group allows Amplify IPs
- Ensure SSL mode is set: `?sslmode=require`

### API Routes Return 404

- Ensure `output: 'export'` is removed from `next.config.js` (already done)
- Verify build completes successfully
- Check Amplify logs for errors

### Authentication Not Working

- Verify `NEXTAUTH_URL` matches your Amplify domain
- Check Google OAuth redirect URI is updated
- Ensure `NEXTAUTH_SECRET` is set

## Updating Your Deployment

After pushing code changes:

1. **Via Git**: Push to your connected branch (Amplify auto-deploys)
2. **Via CLI**: Run `amplify publish`
3. **Via Console**: Click **"Redeploy this version"** in Amplify Console

## Custom Domain Setup

1. Go to **App settings** → **Domain management**
2. Click **"Add domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Update `NEXTAUTH_URL` to match your custom domain

## Monitoring

- **Build logs**: Amplify Console → **Build history**
- **Runtime logs**: Amplify Console → **Monitoring** → **Logs**
- **Metrics**: Amplify Console → **Monitoring** → **Metrics**
