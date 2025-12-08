#!/bin/bash
# Script to update DATABASE_URL to AWS RDS

ENDPOINT="tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com"
PORT="5432"

echo "AWS RDS PostgreSQL Configuration"
echo "================================="
echo ""
echo "Endpoint: $ENDPOINT"
echo "Port: $PORT"
echo ""
read -p "Enter database username: " DB_USER
read -sp "Enter database password: " DB_PASS
echo ""
read -p "Enter database name (default: postgres): " DB_NAME
DB_NAME=${DB_NAME:-postgres}

read -p "Require SSL? (y/n, default: y): " REQUIRE_SSL
REQUIRE_SSL=${REQUIRE_SSL:-y}

if [ "$REQUIRE_SSL" = "y" ]; then
  SSL_PARAM="&sslmode=require"
else
  SSL_PARAM=""
fi

NEW_URL="postgresql://${DB_USER}:${DB_PASS}@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public${SSL_PARAM}"

# Escape special characters for sed
ESCAPED_URL=$(printf '%s\n' "$NEW_URL" | sed 's/[[\.*^$()+?{|]/\\&/g')

if [ -f .env ]; then
  if grep -q "^DATABASE_URL=" .env; then
    # Backup .env
    cp .env .env.backup
    # Update DATABASE_URL
    sed -i.tmp "s|^DATABASE_URL=.*|DATABASE_URL=\"${NEW_URL}\"|" .env
    rm -f .env.tmp
    echo ""
    echo "✅ DATABASE_URL updated successfully!"
    echo "   Backup saved to .env.backup"
    echo ""
    echo "New connection string:"
    echo "postgresql://${DB_USER}:***@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public${SSL_PARAM}"
  else
    echo "DATABASE_URL not found in .env, adding it..."
    echo "DATABASE_URL=\"${NEW_URL}\"" >> .env
    echo "✅ Added DATABASE_URL to .env"
  fi
else
  echo "Creating .env file..."
  echo "DATABASE_URL=\"${NEW_URL}\"" > .env
  echo "✅ Created .env file with DATABASE_URL"
fi
