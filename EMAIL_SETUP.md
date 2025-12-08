# Email Setup Guide - Simple SMTP Configuration

This application uses **SMTP** to send emails automatically. This is the simplest approach - no OAuth flows, no complex setup.

## What You Need

Just two things:

1. **Your Gmail address** (e.g., `BillBrown@ingressSoftware.com`)
2. **Your Gmail password** OR **App Password** (if you have 2FA enabled)

## Setup Steps

### Step 1: Check if you have 2FA enabled

- **No 2FA?** → Use your regular Gmail password
- **Yes 2FA?** → Create an App Password (see below)

### Step 2: Create App Password (only if 2FA is enabled)

If you have 2FA enabled, you need an App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Enter "Meeting Scheduler" as the name
4. Click "Generate"
5. Copy the 16-character password (you can remove spaces if you want)

### Step 3: Add to .env file

Add these lines to your `.env` file:

```bash
# SMTP Configuration for Gmail
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-password-or-app-password"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
```

**Example:**
```bash
SMTP_USER="BillBrown@ingressSoftware.com"
SMTP_PASSWORD="yourpassword123"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
```

### Step 4: Restart your server

```bash
npm run dev
```

That's it! Emails will now be sent automatically when meetings are booked.

## Troubleshooting

### "Invalid login" or "Authentication failed"

- **If you have 2FA enabled**: You MUST use an App Password (not your regular password)
- **If you don't have 2FA**: Use your regular Gmail password
- Make sure you're using your full email address (including @gmail.com or your domain)

### "Less secure app access" error

Gmail no longer supports "less secure apps". If you see this:
- Enable 2FA on your Google account
- Create an App Password
- Use the App Password in `SMTP_PASSWORD`

### Still having issues?

1. Double-check your email and password in `.env`
2. Make sure there are no extra spaces or quotes
3. Restart your server after changing `.env`
4. Check server logs for detailed error messages
