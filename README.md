# Next.js Landing Page with Integrated Meeting Scheduler

A modern Next.js-based single-page application featuring a marketing landing site and a built-in meeting scheduling system integrated with Google Calendar and Gmail APIs.

## Features

### Marketing Landing Page
- Homepage with hero banner, about section, services, and value propositions
- About page with mission, leadership profiles, and company timeline
- Services page with card-based grid layout
- Contact page with contact form and scheduling CTA
- Privacy Policy and Terms of Service pages
- SEO optimized with OpenGraph metadata, sitemap, and robots.txt

### Meeting Scheduler
- Calendly-style booking interface
- Meeting type selection
- Calendar date picker with availability checking
- Time slot selection based on staff availability
- Booking form with visitor details
- Confirmation screen with Google Calendar integration
- Automated email confirmations via Gmail API

### Admin Portal
- Google OAuth authentication for staff
- Dashboard with meeting statistics
- Availability management (weekly schedule, exceptions, vacation days)
- Meeting type management (create, edit, delete)
- Calendar sync status monitoring

### Google API Integration
- Google Calendar API for event creation
- Gmail API for automated email sending
- OAuth 2.0 authentication with refresh token support
- Automatic Google Meet link generation

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **APIs**: Google Calendar API, Gmail API
- **Date Handling**: date-fns

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google Cloud Project with OAuth credentials
- Google Calendar API and Gmail API enabled

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up PostgreSQL Database

Create a PostgreSQL database and note the connection string.

### 3. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google Calendar API and Gmail API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Note your Client ID and Client Secret

### 4. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL (e.g., `http://localhost:3000`)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

### 5. Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Initial Setup for Staff Users

1. Navigate to `/admin` and sign in with Google
2. Grant calendar and email permissions when prompted
3. Set up your availability schedule in the Availability tab
4. Create meeting types in the Meeting Types tab

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── admin/             # Admin portal
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth routes
│   │   ├── schedule/      # Scheduling APIs
│   │   └── admin/         # Admin APIs
│   ├── contact/           # Contact page
│   ├── schedule/          # Scheduling interface
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── landing/          # Landing page components
│   └── scheduling/       # Scheduling components
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   ├── google-calendar.ts  # Google Calendar integration
│   ├── gmail.ts         # Gmail integration
│   └── availability.ts  # Availability calculation logic
└── prisma/              # Prisma schema
    └── schema.prisma
```

## API Routes

### Public Routes
- `GET /api/schedule/meeting-types` - Get available meeting types
- `GET /api/schedule/availability` - Get available time slots
- `POST /api/schedule/create` - Create a booking

### Admin Routes (Requires Authentication)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/availability` - Get availability settings
- `PUT /api/admin/availability` - Update availability settings
- `GET /api/admin/meeting-types` - Get all meeting types
- `POST /api/admin/meeting-types` - Create meeting type
- `PUT /api/admin/meeting-types/[id]` - Update meeting type
- `DELETE /api/admin/meeting-types/[id]` - Delete meeting type

## Database Schema

- **Users**: Staff members with Google OAuth tokens
- **MeetingTypes**: Predefined meeting templates
- **Bookings**: Scheduled meetings with visitor information
- **AvailabilityOverrides**: Date-specific availability exceptions

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### AWS Deployment

The project can be deployed to AWS using:
- AWS Amplify for frontend hosting
- AWS RDS for PostgreSQL database
- AWS Lambda for API routes (via serverless framework)

## Security Considerations

- OAuth tokens are stored encrypted in the database
- API routes include authentication checks
- Rate limiting should be implemented for production
- HTTPS is required for OAuth callbacks
- Environment variables should never be committed

## Performance Optimization

- Server-side rendering for landing pages
- Static generation for content pages
- API response caching for availability queries
- Database query optimization with Prisma

## Accessibility

- Semantic HTML structure
- ARIA labels for calendar components
- Keyboard navigation support
- WCAG AA compliance targets

## Future Enhancements

- Reminder email automation (24h and 1h before)
- Cancellation handling
- Multiple staff member support
- Recurring meeting support
- Integration with additional calendar providers
- Analytics and reporting dashboard

## License

Proprietary - All rights reserved

