#!/bin/bash

# S3 Bucket Setup Script for Static Website Hosting
# Usage: ./scripts/setup-s3-bucket.sh <bucket-name> [region]

set -e

BUCKET_NAME=$1
REGION=${2:-us-east-1}

if [ -z "$BUCKET_NAME" ]; then
  echo "Error: Bucket name is required"
  echo "Usage: ./scripts/setup-s3-bucket.sh <bucket-name> [region]"
  exit 1
fi

echo "Setting up S3 bucket: $BUCKET_NAME in region: $REGION"

# Create bucket
if [ "$REGION" = "us-east-1" ]; then
  aws s3 mb s3://$BUCKET_NAME --region $REGION || echo "Bucket may already exist"
else
  aws s3 mb s3://$BUCKET_NAME --region $REGION || echo "Bucket may already exist"
fi

# Enable static website hosting
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document 404.html

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

# Block public access settings (allow public read)
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
  "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Configure CORS (if needed)
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

echo ""
echo "✓ S3 bucket setup complete!"
echo ""
echo "Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "Next steps:"
echo "1. Run: npm run build:static"
echo "2. Run: ./scripts/deploy-to-s3.sh $BUCKET_NAME $REGION"
