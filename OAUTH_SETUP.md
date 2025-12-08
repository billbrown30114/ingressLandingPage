# Gmail OAuth 2.0 Setup Guide (Passkey Authentication)

This guide will help you set up OAuth 2.0 authentication for Gmail API using refresh tokens (passkeys). This is the **recommended and most secure** method for personal Gmail accounts.

## What You Need

1. **Google Cloud Project** (create one if you don't have it)
2. **OAuth 2.0 Credentials** (Client ID and Client Secret)
3. **Refresh Token** (generated once, works indefinitely)

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Gmail API

1. Go to "APIs & Services" → "Library"
2. Search for "Gmail API"
3. Click "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - **User Type**: External (for personal Gmail) or Internal (for Google Workspace)
   - **App name**: "Meeting Scheduler"
   - **User support email**: Your email
   - **Developer contact**: Your email
   - Click "Save and Continue"
   - Add scopes:
     - `https://www.googleapis.com/auth/gmail.send`
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Click "Save and Continue"
   - Add test users (if external) or skip (if internal)
   - Click "Back to Dashboard"

4. Create OAuth Client ID:
   - **Application type**: Web application
   - **Name**: "Meeting Scheduler Web Client"
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/google/callback` (for development)
     - `https://yourdomain.com/api/auth/google/callback` (for production)
   - Click "Create"
   - **Copy the Client ID and Client Secret** (you'll need these)

### 4. Add Credentials to .env

Add these to your `.env` file:

```bash
# Gmail OAuth 2.0 (Passkey Authentication)
GOOGLE_OAUTH_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"
GOOGLE_OAUTH_REDIRECT_URI="http://localhost:3000/api/auth/google/callback"
```

### 5. Generate Refresh Token

Run the helper script:

```bash
npm run get-oauth-token
```

The script will:
1. Open a browser URL for you to authorize
2. Ask you to paste the authorization code
3. Generate and display your refresh token

**Alternative method** (if script doesn't work):

1. Start your dev server: `npm run dev`
2. Visit this URL (replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI`):
   ```
   https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/calendar.events&access_type=offline&prompt=consent
   ```
3. Authorize the app
4. You'll be redirected to `/api/auth/google/callback?code=...`
5. Copy the `refresh_token` from the response

### 6. Add Refresh Token to .env

Add the refresh token to your `.env` file:

```bash
GOOGLE_OAUTH_REFRESH_TOKEN="your-refresh-token-here"
```

### 7. Restart Your Server

```bash
npm run dev
```

## How It Works

The application will try authentication methods in this order:

1. **OAuth 2.0 Refresh Token** (if `GOOGLE_OAUTH_REFRESH_TOKEN` is set) ✅ **Preferred**
2. **Service Account** (if `GOOGLE_SERVICE_ACCOUNT_EMAIL` is set)
3. **SMTP** (if `SMTP_USER` and `SMTP_PASSWORD` are set)

## Security Notes

- ✅ **Refresh tokens don't expire** (unless revoked)
- ✅ **More secure than passwords** - no password stored
- ✅ **Works with 2FA** - no app passwords needed
- ✅ **Revocable** - you can revoke access anytime at https://myaccount.google.com/permissions

## Troubleshooting

### "No refresh token received"

- Make sure `prompt=consent` is in the authorization URL
- Revoke previous access at https://myaccount.google.com/permissions
- Try the authorization flow again

### "Invalid grant" error

- The refresh token may have been revoked
- Generate a new refresh token using `npm run get-oauth-token`

### "Access denied" or "Insufficient permissions"

- Make sure you've granted all required scopes:
  - `gmail.send`
  - `calendar`
  - `calendar.events`
- Check OAuth consent screen configuration

## Revoking Access

To revoke access and generate a new token:

1. Go to https://myaccount.google.com/permissions
2. Find "Meeting Scheduler" or your app name
3. Click "Remove Access"
4. Run `npm run get-oauth-token` again to generate a new token

