#!/bin/bash

# Complete Amplify Setup Script
# This script helps complete the Amplify deployment setup

set -e

APP_ID="d1zt1na9fbodzm"
REGION="us-east-1"
BRANCH="main"

echo "=========================================="
echo "AWS Amplify Setup - Remaining Steps"
echo "=========================================="
echo ""
echo "Amplify App ID: $APP_ID"
echo "App URL: https://$APP_ID.amplifyapp.com"
echo ""
echo "Step 1: Connect GitHub Repository"
echo "-----------------------------------"
echo "1. Go to: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/settings/general"
echo "2. Click 'Edit' under 'Repository'"
echo "3. Select 'GitHub'"
echo "4. Authorize GitHub (if needed)"
echo "5. Select repository: billbrown30114/ingressLandingPage"
echo "6. Select branch: main"
echo "7. Click 'Save'"
echo ""
echo "Step 2: Add Environment Variables"
echo "-----------------------------------"
echo "Go to: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/environment-variables"
echo ""
echo "Add these variables:"
echo ""
echo "DATABASE_URL=postgresql://USERNAME:PASSWORD@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/DATABASE_NAME?schema=public&sslmode=require"
echo "NEXTAUTH_URL=https://$APP_ID.amplifyapp.com"
echo "NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>"
echo "GOOGLE_CLIENT_ID=your-google-client-id"
echo "GOOGLE_CLIENT_SECRET=your-google-client-secret"
echo "NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id"
echo ""
echo "Step 3: Deploy"
echo "--------------"
echo "After connecting the repository, Amplify will automatically start building."
echo "Or manually trigger: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/main/deployments"
echo ""
echo "Step 4: Monitor Build"
echo "--------------------"
echo "View build logs: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/main/builds"
echo ""

# Generate NEXTAUTH_SECRET if openssl is available
if command -v openssl &> /dev/null; then
  echo "Generated NEXTAUTH_SECRET:"
  openssl rand -base64 32
  echo ""
fi

echo "=========================================="
echo "Quick Links:"
echo "=========================================="
echo "App Settings: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/settings/general"
echo "Environment Variables: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/environment-variables"
echo "Build History: https://console.aws.amazon.com/amplify/home?region=$REGION#/$APP_ID/main/builds"
echo "App URL: https://$APP_ID.amplifyapp.com"
echo ""
