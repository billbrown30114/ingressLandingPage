#!/bin/bash

# Create CloudFront Distribution for S3 Static Website
# Usage: ./scripts/create-cloudfront.sh <bucket-name> [region] [domain-name]

set -e

BUCKET_NAME=$1
REGION=${2:-us-east-1}
DOMAIN_NAME=$3

if [ -z "$BUCKET_NAME" ]; then
  echo "Error: Bucket name is required"
  echo "Usage: ./scripts/create-cloudfront.sh <bucket-name> [region] [domain-name]"
  exit 1
fi

S3_ORIGIN="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"

# Create CloudFront distribution config
cat > /tmp/cloudfront-config.json <<EOF
{
  "CallerReference": "$(date +%s)",
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

# Add domain name if provided
if [ -n "$DOMAIN_NAME" ]; then
  cat > /tmp/cloudfront-config-with-domain.json <<EOF
{
  "CallerReference": "$(date +%s)",
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
  "Aliases": {
    "Quantity": 1,
    "Items": ["$DOMAIN_NAME"]
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF
  CONFIG_FILE="/tmp/cloudfront-config-with-domain.json"
else
  CONFIG_FILE="/tmp/cloudfront-config.json"
fi

echo "Creating CloudFront distribution..."
DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution --distribution-config file://$CONFIG_FILE)

DISTRIBUTION_ID=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.Id')
DOMAIN_NAME_OUT=$(echo $DISTRIBUTION_OUTPUT | jq -r '.Distribution.DomainName')

# Clean up temp files
rm -f /tmp/cloudfront-config.json /tmp/cloudfront-config-with-domain.json

echo ""
echo "✓ CloudFront distribution created!"
echo ""
echo "Distribution ID: $DISTRIBUTION_ID"
echo "CloudFront URL: https://$DOMAIN_NAME_OUT"
echo ""
echo "Note: It may take 10-15 minutes for the distribution to be fully deployed."
echo ""
echo "To deploy and invalidate cache:"
echo "  ./scripts/deploy-to-s3.sh $BUCKET_NAME $REGION --invalidate-cloudfront $DISTRIBUTION_ID"
