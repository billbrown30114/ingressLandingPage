#!/bin/bash

echo "=== Testing Authentication ==="
echo ""

# Get CSRF token
echo "1. Getting CSRF token..."
CSRF_RESPONSE=$(curl -s -c cookies.txt http://localhost:3000/api/auth/csrf)
CSRF_TOKEN=$(echo $CSRF_RESPONSE | grep -o '"csrfToken":"[^"]*' | cut -d'"' -f4)
echo "CSRF Token: $CSRF_TOKEN"
echo ""

# Sign in
echo "2. Signing in..."
SIGNIN_RESPONSE=$(curl -s -b cookies.txt -c cookies.txt \
  -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=billbrown@ingresssoftware.net" \
  -d "password=test123" \
  -d "csrfToken=$CSRF_TOKEN" \
  -d "callbackUrl=/admin" \
  -d "json=true" \
  http://localhost:3000/api/auth/callback/credentials)

echo "Sign in response: $SIGNIN_RESPONSE"
echo ""

# Check session
echo "3. Checking session..."
SESSION_RESPONSE=$(curl -s -b cookies.txt http://localhost:3000/api/auth/session)
echo "Session: $SESSION_RESPONSE"
echo ""

# Test admin stats endpoint
echo "4. Testing admin stats endpoint..."
STATS_RESPONSE=$(curl -s -b cookies.txt http://localhost:3000/api/admin/stats)
echo "Stats: $STATS_RESPONSE"
echo ""

# Test admin bookings endpoint
echo "5. Testing admin bookings endpoint..."
BOOKINGS_RESPONSE=$(curl -s -b cookies.txt http://localhost:3000/api/admin/bookings)
echo "Bookings (first 500 chars): ${BOOKINGS_RESPONSE:0:500}"
echo ""

# Cleanup
rm -f cookies.txt

echo "=== Test Complete ==="
