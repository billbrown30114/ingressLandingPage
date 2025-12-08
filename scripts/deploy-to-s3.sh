#!/bin/bash

# Deploy Static Next.js Build to S3 with CloudFront
# Usage: ./scripts/deploy-to-s3.sh <bucket-name> [region] [--no-cloudfront] [--distribution-id <id>]

set -e

BUCKET_NAME=$1
REGION=${2:-us-east-1}
CLOUDFRONT_ID=""
CREATE_CLOUDFRONT=true

# Parse optional arguments
if [ "$3" = "--no-cloudfront" ]; then
  CREATE_CLOUDFRONT=false
elif [ "$3" = "--distribution-id" ] && [ -n "$4" ]; then
  CLOUDFRONT_ID=$4
  CREATE_CLOUDFRONT=false
fi

if [ -z "$BUCKET_NAME" ]; then
  echo "Error: Bucket name is required"
  echo "Usage: ./scripts/deploy-to-s3.sh <bucket-name> [region] [--no-cloudfront] [--distribution-id <id>]"
  exit 1
fi

# Check for jq (required for CloudFront)
if [ "$CREATE_CLOUDFRONT" = true ] && ! command -v jq &> /dev/null; then
  echo "Warning: jq is not installed. CloudFront creation requires jq."
  echo "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
  echo "Skipping CloudFront setup..."
  CREATE_CLOUDFRONT=false
fi

# Check if out directory exists
if [ ! -d "out" ]; then
  echo "Error: 'out' directory not found. Run 'npm run build:static' first."
  exit 1
fi

# Check if bucket exists, create if it doesn't
set +e
aws s3 ls "s3://$BUCKET_NAME" 2>&1 > /dev/null
BUCKET_EXISTS=$?
set -e

if [ $BUCKET_EXISTS -ne 0 ]; then
  echo "Bucket $BUCKET_NAME does not exist. Creating..."
  if [ "$REGION" = "us-east-1" ]; then
    aws s3 mb s3://$BUCKET_NAME --region $REGION
  else
    aws s3 mb s3://$BUCKET_NAME --region $REGION
  fi
  
  echo "Configuring bucket for static website hosting..."
  
  # Enable static website hosting
  aws s3 website s3://$BUCKET_NAME \
    --index-document index.html \
    --error-document 404.html
  
  # First, disable Block Public Access to allow public read policy
  echo "Configuring public access settings..."
  aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
  
  # Set bucket policy for public read access
  cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF
  
  aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json
  
  # Configure CORS
  cat > /tmp/cors-config.json <<EOF
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF
  
  aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file:///tmp/cors-config.json
  
  # Clean up temp files
  rm -f /tmp/bucket-policy.json /tmp/cors-config.json
  
  echo "✓ Bucket created and configured"
else
  echo "Bucket $BUCKET_NAME already exists"
fi

# Check for existing CloudFront distribution or create one
if [ "$CREATE_CLOUDFRONT" = true ] && [ -z "$CLOUDFRONT_ID" ]; then
  echo ""
  echo "Checking for existing CloudFront distribution..."
  
  # Try to find existing distribution for this bucket
  set +e
  EXISTING_DIST=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='CloudFront distribution for $BUCKET_NAME'].Id" --output text 2>/dev/null | head -n1)
  set -e
  
  if [ -n "$EXISTING_DIST" ] && [ "$EXISTING_DIST" != "None" ]; then
    CLOUDFRONT_ID=$EXISTING_DIST
    echo "Found existing CloudFront distribution: $CLOUDFRONT_ID"
  else
    echo "No CloudFront distribution found. Creating one..."
    
    # Create CloudFront distribution config
    cat > /tmp/cloudfront-config.json <<EOF
{
  "CallerReference": "$(date +%s)-$BUCKET_NAME",
  "Comment": "CloudFront distribution for $BUCKET_NAME",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-$BUCKET_NAME",
        "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "http-only",
          "OriginSslProtocols": {
            "Quantity": 1,
            "Items": ["TLSv1.2"]
          }
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-$BUCKET_NAME",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
    
    DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config file:///tmp/cloudfront-config.json)
    CLOUDFRONT_ID=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.Id')
    CLOUDFRONT_DOMAIN=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.DomainName')
    
    rm -f /tmp/cloudfront-config.json
    
    echo "✓ CloudFront distribution created: $CLOUDFRONT_ID"
    echo "  Domain: https://$CLOUDFRONT_DOMAIN"
    echo "  Note: Distribution may take 10-15 minutes to fully deploy"
  fi
fi

echo ""
echo "Deploying to S3 bucket: $BUCKET_NAME in region: $REGION"

# Sync files to S3 (delete removed files, set cache headers)
aws s3 sync out/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "*.json"

# Sync HTML files with shorter cache
aws s3 sync out/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"

# Set content types
aws s3 cp out/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --recursive \
  --exclude "*" \
  --include "*.css" \
  --content-type "text/css" \
  --metadata-directive REPLACE

aws s3 cp out/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --recursive \
  --exclude "*" \
  --include "*.js" \
  --content-type "application/javascript" \
  --metadata-directive REPLACE

aws s3 cp out/ s3://$BUCKET_NAME/ \
  --region $REGION \
  --recursive \
  --exclude "*" \
  --include "*.json" \
  --content-type "application/json" \
  --metadata-directive REPLACE

# Invalidate CloudFront cache if distribution ID provided
if [ -n "$CLOUDFRONT_ID" ]; then
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_ID \
    --paths "/*"
  echo "✓ CloudFront invalidation created"
fi

echo ""
echo "✓ Deployment complete!"
echo ""
echo "S3 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
if [ -n "$CLOUDFRONT_ID" ]; then
  CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution --id $CLOUDFRONT_ID --query 'Distribution.DomainName' --output text 2>/dev/null || echo "")
  if [ -n "$CLOUDFRONT_DOMAIN" ]; then
    echo "CloudFront URL: https://$CLOUDFRONT_DOMAIN"
    echo "Distribution ID: $CLOUDFRONT_ID"
  else
    echo "CloudFront Distribution ID: $CLOUDFRONT_ID (deploying...)"
  fi
fi
