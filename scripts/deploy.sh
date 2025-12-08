#!/bin/bash

# Complete deployment script for S3 static website
# Usage: ./scripts/deploy.sh <bucket-name> [region] [--setup-bucket] [--create-cloudfront]

set -e

BUCKET_NAME=$1
REGION=${2:-us-east-1}
SETUP_BUCKET=false
CREATE_CLOUDFRONT=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --setup-bucket)
      SETUP_BUCKET=true
      shift
      ;;
    --create-cloudfront)
      CREATE_CLOUDFRONT=true
      shift
      ;;
  esac
done

if [ -z "$BUCKET_NAME" ]; then
  echo "Error: Bucket name is required"
  echo "Usage: ./scripts/deploy.sh <bucket-name> [region] [--setup-bucket] [--create-cloudfront]"
  exit 1
fi

echo "=========================================="
echo "Deploying to AWS S3"
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo "=========================================="
echo ""

# Step 1: Setup bucket if requested
if [ "$SETUP_BUCKET" = true ]; then
  echo "Step 1: Setting up S3 bucket..."
  ./scripts/setup-s3-bucket.sh $BUCKET_NAME $REGION
  echo ""
fi

# Step 2: Build static site
echo "Step 2: Building static site..."
npm run build:static

if [ ! -d "out" ]; then
  echo "Error: Build failed - 'out' directory not found"
  exit 1
fi

echo "✓ Build complete"
echo ""

# Step 3: Create CloudFront if requested
if [ "$CREATE_CLOUDFRONT" = true ]; then
  echo "Step 3: Creating CloudFront distribution..."
  ./scripts/create-cloudfront.sh $BUCKET_NAME $REGION
  echo ""
  echo "Note: CloudFront distribution may take 10-15 minutes to deploy."
  echo "You can deploy files now and invalidate cache later."
  echo ""
  read -p "Enter CloudFront Distribution ID (or press Enter to skip): " CLOUDFRONT_ID
else
  CLOUDFRONT_ID=""
fi

# Step 4: Deploy to S3
echo "Step 4: Deploying to S3..."
if [ -n "$CLOUDFRONT_ID" ]; then
  ./scripts/deploy-to-s3.sh $BUCKET_NAME $REGION --invalidate-cloudfront $CLOUDFRONT_ID
else
  ./scripts/deploy-to-s3.sh $BUCKET_NAME $REGION
fi

echo ""
echo "=========================================="
echo "✓ Deployment Complete!"
echo "=========================================="
echo ""
echo "Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
if [ -n "$CLOUDFRONT_ID" ]; then
  echo "CloudFront URL: https://$(aws cloudfront get-distribution --id $CLOUDFRONT_ID --query 'Distribution.DomainName' --output text 2>/dev/null || echo 'pending...')"
fi
echo ""
