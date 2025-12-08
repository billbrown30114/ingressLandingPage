# Curl Test Commands for Authentication

Run these commands in order to test the authentication flow.

## Prerequisites
Make sure your server is running: `npm run dev`

## Step 1: Get CSRF Token

```bash
curl -s -c cookies.txt http://localhost:3000/api/auth/csrf
```

Save the `csrfToken` value from the response.

## Step 2: Sign In

Replace `YOUR_CSRF_TOKEN` with the token from Step 1:

```bash
curl -s -b cookies.txt -c cookies.txt \
  -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=billbrown@ingresssoftware.net" \
  -d "password=anypassword" \
  -d "csrfToken=YOUR_CSRF_TOKEN" \
  -d "callbackUrl=/admin" \
  -d "json=true" \
  http://localhost:3000/api/auth/callback/credentials
```

Expected response: `{"ok":true}` or `{"url":"/admin"}`

## Step 3: Check Session

```bash
curl -s -b cookies.txt http://localhost:3000/api/auth/session
```

Expected response: JSON with user session data including `user` object and `userId`

## Step 4: Test Admin Stats Endpoint

```bash
curl -s -b cookies.txt http://localhost:3000/api/admin/stats
```

Expected response: `{"todayMeetings":0,"upcomingMeetings":0,"pendingInvites":0}`

## Step 5: Test Admin Bookings Endpoint

```bash
curl -s -b cookies.txt http://localhost:3000/api/admin/bookings
```

Expected response: JSON array of bookings (may be empty `[]` if no bookings exist)

## Step 6: Test Without Authentication (Should Fail)

```bash
curl -s http://localhost:3000/api/admin/stats
```

Expected response: `{"error":"Unauthorized"}` with status 401

## Quick Test Script

Or run the automated script:

```bash
./test-auth.sh
```

## Troubleshooting

If sign-in fails:
1. Check server logs for authentication errors
2. Verify the email matches exactly: `billbrown@ingresssoftware.net`
3. Ensure cookies.txt is being saved and reused
4. Check that CSRF token is valid (they expire)

