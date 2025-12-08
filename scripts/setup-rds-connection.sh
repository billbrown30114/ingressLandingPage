#!/bin/bash

ENDPOINT="tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com"
PORT="5432"

echo "=========================================="
echo "AWS RDS PostgreSQL Connection Setup"
echo "=========================================="
echo ""
echo "Endpoint: $ENDPOINT"
echo "Port: $PORT"
echo ""

read -p "Enter RDS master username: " DB_USER
read -sp "Enter RDS master password: " DB_PASS
echo ""
read -p "Enter database name (default: postgres): " DB_NAME
DB_NAME=${DB_NAME:-postgres}

# URL encode password (handle special characters)
ENCODED_PASS=$(printf '%s' "$DB_PASS" | jq -sRr @uri 2>/dev/null || printf '%s' "$DB_PASS" | sed 's/:/%3A/g; s/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g; s/+/%2B/g; s/,/%2C/g; s/;/%3B/g; s/=/%3D/g; s/?/%3F/g; s/ /%20/g')

NEW_URL="postgresql://${DB_USER}:${ENCODED_PASS}@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public&sslmode=require"

# Backup .env
if [ -f .env ]; then
  cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
  echo "✅ Backed up .env file"
fi

# Update or add DATABASE_URL
if grep -q "^DATABASE_URL=" .env; then
  # Use a different approach to handle special characters
  sed -i.tmp "s|^DATABASE_URL=.*|DATABASE_URL=\"${NEW_URL}\"|" .env
  rm -f .env.tmp 2>/dev/null
  echo "✅ Updated DATABASE_URL in .env"
else
  echo "DATABASE_URL=\"${NEW_URL}\"" >> .env
  echo "✅ Added DATABASE_URL to .env"
fi

echo ""
echo "=========================================="
echo "Connection configured!"
echo "=========================================="
echo ""
echo "Testing connection..."
echo ""

# Test connection
npm run test-db

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Connection successful!"
  echo ""
  echo "Next steps:"
  echo "  1. npm run db:push          # Create database schema"
  echo "  2. npm run create-admin billbrown@ingresssoftware.com \"Bill Brown\"  # Create admin user"
else
  echo ""
  echo "❌ Connection failed. Please check:"
  echo "  - Username and password are correct"
  echo "  - Database name exists"
  echo "  - Your IP is allowed in RDS security group"
  echo "  - SSL mode requirements"
fi

