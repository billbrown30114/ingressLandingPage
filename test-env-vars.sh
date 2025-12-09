#!/bin/bash

# Test script to verify environment variables are working in Amplify deployment
# Usage: ./test-env-vars.sh [base-url]
# Example: ./test-env-vars.sh https://main.d1zt1na9fbodzm.amplifyapp.com

BASE_URL="${1:-https://main.d1zt1na9fbodzm.amplifyapp.com}"
ENDPOINT="${BASE_URL}/api/schedule/meeting-types"

echo "=========================================="
echo "Testing Environment Variables in Amplify"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo "Endpoint: $ENDPOINT"
echo ""

# Test 1: Check if API endpoint is accessible
echo "Test 1: Checking API endpoint accessibility..."
HTTP_CODE=$(curl -s -o /tmp/response.json -w "%{http_code}" "$ENDPOINT")

if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✓ API endpoint returned 200 OK"
    echo ""
    echo "Response:"
    cat /tmp/response.json | python3 -m json.tool 2>/dev/null || cat /tmp/response.json
    echo ""
elif [ "$HTTP_CODE" -eq 500 ]; then
    echo "✗ API endpoint returned 500 Internal Server Error"
    echo ""
    echo "Checking error details..."
    
    # Try to extract JSON error if available
    RESPONSE=$(cat /tmp/response.json)
    if echo "$RESPONSE" | grep -q "hasDatabaseUrl"; then
        echo "Error response contains environment variable info:"
        echo "$RESPONSE" | grep -o '"hasDatabaseUrl":[^,]*' || echo "Could not extract hasDatabaseUrl"
        echo "$RESPONSE" | grep -o '"nodeEnv":[^,]*' || echo "Could not extract nodeEnv"
    else
        echo "Full error response:"
        echo "$RESPONSE"
    fi
    echo ""
else
    echo "✗ API endpoint returned HTTP $HTTP_CODE"
    echo ""
    echo "Response:"
    cat /tmp/response.json
    echo ""
fi

# Test 2: Check if we can get a proper JSON response
echo "Test 2: Checking JSON response format..."
if [ "$HTTP_CODE" -eq 200 ]; then
    if cat /tmp/response.json | python3 -c "import sys, json; json.load(sys.stdin)" 2>/dev/null; then
        echo "✓ Response is valid JSON"
    else
        echo "✗ Response is not valid JSON"
    fi
else
    echo "⚠ Skipping JSON validation (non-200 response)"
fi
echo ""

# Test 3: Check for specific environment variable indicators
echo "Test 3: Checking for environment variable indicators in error response..."
if [ "$HTTP_CODE" -eq 500 ]; then
    RESPONSE=$(cat /tmp/response.json)
    if echo "$RESPONSE" | grep -q "hasDatabaseUrl.*false"; then
        echo "✗ DATABASE_URL is NOT available (hasDatabaseUrl: false)"
    elif echo "$RESPONSE" | grep -q "hasDatabaseUrl.*true"; then
        echo "✓ DATABASE_URL appears to be available (hasDatabaseUrl: true)"
    else
        echo "⚠ Could not determine DATABASE_URL status from error response"
    fi
else
    echo "⚠ Skipping (endpoint returned $HTTP_CODE, not 500)"
fi
echo ""

# Test 4: Test other endpoints
echo "Test 4: Testing other API endpoints..."
AVAILABILITY_ENDPOINT="${BASE_URL}/api/schedule/availability?date=2025-12-15&meetingTypeId=test"
AVAILABILITY_CODE=$(curl -s -o /tmp/availability.json -w "%{http_code}" "$AVAILABILITY_ENDPOINT")
echo "Availability endpoint: HTTP $AVAILABILITY_CODE"
if [ "$AVAILABILITY_CODE" -eq 200 ] || [ "$AVAILABILITY_CODE" -eq 400 ]; then
    echo "✓ Availability endpoint is responding (may return 400 for invalid params, which is expected)"
else
    echo "✗ Availability endpoint returned $AVAILABILITY_CODE"
fi
echo ""

# Summary
echo "=========================================="
echo "Summary"
echo "=========================================="
if [ "$HTTP_CODE" -eq 200 ]; then
    echo "✓ Environment variables appear to be working correctly"
    echo "✓ API endpoint is functional"
    exit 0
else
    echo "✗ Environment variables may not be working correctly"
    echo "✗ API endpoint returned error code: $HTTP_CODE"
    echo ""
    echo "Next steps:"
    echo "1. Check Amplify build logs to verify .env.production was created"
    echo "2. Verify environment variables are set in Amplify Console"
    echo "3. Ensure .env.production is created in preBuild phase (not build phase)"
    exit 1
fi
