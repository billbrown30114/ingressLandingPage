#!/bin/bash

# AWS Amplify Deployment Helper Script
# This script helps set up and deploy to AWS Amplify

set -e

echo "=========================================="
echo "AWS Amplify Deployment Helper"
echo "=========================================="
echo ""

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
  echo "Amplify CLI not found. Installing..."
  npm install -g @aws-amplify/cli
fi

echo "Choose deployment method:"
echo "1. Connect via Amplify Console (Recommended - uses GitHub/GitLab)"
echo "2. Deploy via Amplify CLI (requires AWS credentials)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
  1)
    echo ""
    echo "=========================================="
    echo "Deploy via Amplify Console"
    echo "=========================================="
    echo ""
    echo "Steps:"
    echo "1. Go to: https://console.aws.amazon.com/amplify/"
    echo "2. Click 'New app' → 'Host web app'"
    echo "3. Select your Git provider and repository"
    echo "4. Amplify will auto-detect amplify.yml"
    echo "5. Add environment variables (see AMPLIFY_DEPLOY.md)"
    echo "6. Click 'Save and deploy'"
    echo ""
    echo "Required Environment Variables:"
    echo "  - DATABASE_URL"
    echo "  - NEXTAUTH_URL (set after deployment)"
    echo "  - NEXTAUTH_SECRET"
    echo "  - GOOGLE_CLIENT_ID"
    echo "  - GOOGLE_CLIENT_SECRET"
    echo "  - NEXT_PUBLIC_GOOGLE_CLIENT_ID"
    echo ""
    echo "See AMPLIFY_DEPLOY.md for detailed instructions."
    ;;
  2)
    echo ""
    echo "=========================================="
    echo "Deploy via Amplify CLI"
    echo "=========================================="
    echo ""
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
      echo "AWS credentials not configured."
      echo "Run: aws configure"
      echo "Or set AWS_PROFILE environment variable"
      exit 1
    fi
    
    echo "Initializing Amplify..."
    amplify init
    
    echo ""
    echo "Adding hosting..."
    amplify add hosting
    
    echo ""
    echo "Publishing to Amplify..."
    amplify publish
    
    echo ""
    echo "✓ Deployment complete!"
    ;;
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac
