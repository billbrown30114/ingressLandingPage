#!/bin/bash
# Update DATABASE_URL in .env file

ENDPOINT="tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com"
PORT="5432"

echo "Updating DATABASE_URL in .env file..."
echo ""
echo "Please provide:"
read -p "Database username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "Database password: " DB_PASS
echo ""

read -p "Database name (default: postgres): " DB_NAME
DB_NAME=${DB_NAME:-postgres}

# Update .env file
if grep -q "^DATABASE_URL=" .env; then
  sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=\"postgresql://${DB_USER}:${DB_PASS}@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public\"|" .env
  echo "✅ DATABASE_URL updated successfully!"
  echo ""
  echo "Connection string format:"
  echo "postgresql://${DB_USER}:***@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public"
else
  echo "DATABASE_URL not found in .env file"
fi
