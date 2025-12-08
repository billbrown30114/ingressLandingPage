#!/bin/bash

# AWS Amplify Setup Script
# This script helps set up AWS Amplify for deployment

set -e

echo "=========================================="
echo "AWS Amplify Setup"
echo "=========================================="
echo ""

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
  echo "Amplify CLI not found. Installing..."
  npm install -g @aws-amplify/cli
fi

echo "Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
  echo "Error: AWS credentials not configured"
  echo "Run: aws configure"
  exit 1
fi

echo "✓ AWS credentials configured"
echo ""

# Check if amplify.yml exists
if [ ! -f "amplify.yml" ]; then
  echo "Error: amplify.yml not found"
  exit 1
fi

echo "Next steps:"
echo ""
echo "1. Initialize Amplify (if not already done):"
echo "   amplify init"
echo ""
echo "2. Add hosting:"
echo "   amplify add hosting"
echo ""
echo "3. Set environment variables in Amplify Console:"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_URL (will be your Amplify domain)"
echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo "   - GOOGLE_CLIENT_ID"
echo "   - GOOGLE_CLIENT_SECRET"
echo "   - NEXT_PUBLIC_GOOGLE_CLIENT_ID"
echo ""
echo "4. Connect your Git repository in Amplify Console:"
echo "   https://console.aws.amazon.com/amplify/"
echo ""
echo "5. Deploy:"
echo "   amplify publish"
echo ""
echo "Or push to your Git repository and Amplify will auto-deploy"
echo ""
echo "See AMPLIFY_SETUP.md for detailed instructions"
