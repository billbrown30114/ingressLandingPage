# Google Service Account Setup Guide

This application uses a **Google Service Account** for backend API access. Visitors do NOT need to authenticate - only the backend needs permissions to access Google Calendar and Gmail APIs.

## Why Service Account?

- **No user authentication required**: Visitors can book meetings without signing in
- **Backend-only permissions**: The service account handles all Google API calls
- **Simpler architecture**: No OAuth flows for end users
- **Secure**: Service account credentials are stored server-side only

## Setup Steps

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your project ID

### 2. Enable Required APIs

Enable these APIs in your project:
- **Google Calendar API**
- **Gmail API**

To enable:
1. Go to "APIs & Services" → "Library"
2. Search for each API
3. Click "Enable"

### 3. Create a Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in:
   - **Service account name**: e.g., "Meeting Scheduler Service"
   - **Service account ID**: auto-generated
   - **Description**: "Service account for meeting scheduler backend"
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 4. Create and Download Service Account Key

1. In the service accounts list, click on your newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this downloads a JSON file

**Important**: Keep this JSON file secure! Do NOT commit it to git.

### 5. Extract Credentials from JSON

Open the downloaded JSON file. You'll need these values:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@project-id.iam.gserviceaccount.com",
  ...
}
```

### 6. Configure Domain-Wide Delegation (Required)

To access user calendars and send emails on behalf of staff members:

1. In the service account details, check "Enable Google Workspace Domain-wide Delegation"
2. Note the **Client ID** (a long number)
3. Go to your Google Workspace Admin Console
4. Navigate to "Security" → "API Controls" → "Domain-wide Delegation"
5. Click "Add new"
6. Enter:
   - **Client ID**: The Client ID from step 2
   - **OAuth Scopes**: 
     ```
     https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/calendar.events,https://www.googleapis.com/auth/gmail.send
     ```
7. Click "Authorize"

**Note**: If you're using a personal Gmail account (not Google Workspace), you'll need to:
- Share your calendar with the service account email
- Grant the service account access to your calendar

### 7. Share Calendar with Service Account (Alternative for Personal Gmail)

If you're NOT using Google Workspace:

1. Open Google Calendar
2. Go to Settings → "Settings for my calendars"
3. Select your calendar
4. Go to "Share with specific people"
5. Click "Add people"
6. Add the service account email (from the JSON file: `client_email`)
7. Give it "Make changes to events" permission
8. Click "Send"

### 8. Update Environment Variables

Add these to your `.env` file:

```bash
# Google Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account@project-id.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Important Notes**:
- The `PRIVATE_KEY` must include the `\n` characters (they represent newlines)
- Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep the `\n` characters in the string

Example:
```bash
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### 9. Add Staff User to Database

Create a staff user record in your database:

```sql
INSERT INTO users (id, email, name, created_at, updated_at)
VALUES ('staff-1', 'your-email@example.com', 'Your Name', NOW(), NOW());
```

Or use Prisma Studio:
```bash
npm run db:studio
```

Then manually add a user with:
- `email`: Your Google account email (the one whose calendar will be used)
- `name`: Your name

### 10. Test the Setup

1. Restart your development server
2. Try booking a meeting through the scheduling interface
3. Check your Google Calendar - you should see the event created
4. Check the visitor's email - they should receive a confirmation email

## Troubleshooting

### Error: "Service account credentials not configured"
- Check that `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` are set in `.env`
- Restart your server after updating `.env`

### Error: "Insufficient Permission" or "Access Denied"
- Verify domain-wide delegation is enabled and configured correctly
- Check that the OAuth scopes are correct
- Ensure the service account email matches what's in your `.env` file

### Calendar events not being created
- Verify the service account has access to the calendar (domain-wide delegation or calendar sharing)
- Check that the staff user email in the database matches your Google account email
- Check server logs for detailed error messages

### Emails not being sent
- Verify Gmail API is enabled
- Check domain-wide delegation includes `gmail.send` scope
- Ensure the service account has permission to send emails on behalf of the user

## Security Best Practices

1. **Never commit the service account JSON file to git**
2. **Keep `.env` file secure** - it's already in `.gitignore`
3. **Rotate service account keys periodically**
4. **Use environment-specific service accounts** for development/production
5. **Limit service account permissions** to only what's needed

## Architecture Overview

```
Visitor → Booking Form → API Route → Service Account → Google Calendar/Gmail
                                    ↓
                              Creates event / Sends email
                                    ↓
                              Staff Calendar (via delegation)
```

The service account acts as a proxy, using domain-wide delegation to access staff calendars and send emails on their behalf, without requiring any user authentication from visitors.

