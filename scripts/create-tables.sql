-- Create tables for landing page scheduler
-- These will only be created if they don't already exist

CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "default_availability" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

CREATE TABLE IF NOT EXISTS "meeting_types" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "rules" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meeting_types_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "bookings" (
    "id" TEXT NOT NULL,
    "visitor_name" TEXT NOT NULL,
    "visitor_email" TEXT NOT NULL,
    "visitor_phone" TEXT,
    "notes" TEXT,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "meeting_type_id" TEXT NOT NULL,
    "staff_user_id" TEXT NOT NULL,
    "google_event_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "bookings_google_event_id_key" ON "bookings"("google_event_id");

CREATE TABLE IF NOT EXISTS "availability_overrides" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "modified_hours" JSONB,
    "is_vacation" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_overrides_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "availability_overrides_user_id_date_key" ON "availability_overrides"("user_id", "date");

-- Create foreign key constraints if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'bookings_meeting_type_id_fkey'
    ) THEN
        ALTER TABLE "bookings" ADD CONSTRAINT "bookings_meeting_type_id_fkey" 
        FOREIGN KEY ("meeting_type_id") REFERENCES "meeting_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'bookings_staff_user_id_fkey'
    ) THEN
        ALTER TABLE "bookings" ADD CONSTRAINT "bookings_staff_user_id_fkey" 
        FOREIGN KEY ("staff_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'availability_overrides_user_id_fkey'
    ) THEN
        ALTER TABLE "availability_overrides" ADD CONSTRAINT "availability_overrides_user_id_fkey" 
        FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- Create enum type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BookingStatus') THEN
        CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'PENDING');
    END IF;
END $$;

-- Update bookings.status column to use enum if it's not already
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'bookings' 
        AND column_name = 'status' 
        AND data_type = 'text'
    ) THEN
        ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "BookingStatus" USING "status"::"BookingStatus";
    END IF;
END $$;

