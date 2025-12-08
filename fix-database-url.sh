#!/bin/bash

echo "=========================================="
echo "Fixing DATABASE_URL Configuration"
echo "=========================================="
echo ""

# Check if DATABASE_URL exists
if grep -q "^DATABASE_URL=" .env 2>/dev/null; then
    echo "Current DATABASE_URL found in .env"
    grep "^DATABASE_URL=" .env
    echo ""
    read -p "Do you want to replace it? (y/n): " REPLACE
    if [ "$REPLACE" != "y" ]; then
        echo "Aborted."
        exit 0
    fi
    # Remove old DATABASE_URL
    sed -i.bak '/^DATABASE_URL=/d' .env
    echo "Removed old DATABASE_URL"
else
    echo "No DATABASE_URL found, will add new one"
fi

echo ""
echo "Enter your AWS RDS credentials:"
echo ""

read -p "Database Username: " DB_USER
read -sp "Database Password: " DB_PASS
echo ""
read -p "Database Name (default: postgres): " DB_NAME
DB_NAME=${DB_NAME:-postgres}

ENDPOINT="tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com"
PORT="5432"

# URL encode password (basic encoding for common special chars)
ENCODED_PASS=$(printf '%s' "$DB_PASS" | sed 's/:/%3A/g; s/@/%40/g; s/#/%23/g; s/\$/%24/g; s/&/%26/g; s/+/%2B/g; s/,/%2C/g; s/;/%3B/g; s/=/%3D/g; s/?/%3F/g; s/ /%20/g; s/\[/%5B/g; s/\]/%5D/g')

NEW_URL="postgresql://${DB_USER}:${ENCODED_PASS}@${ENDPOINT}:${PORT}/${DB_NAME}?schema=public&sslmode=require"

# Add DATABASE_URL to .env (after the Database comment if it exists)
if grep -q "^# Database" .env; then
    # Add after Database comment
    sed -i.bak "/^# Database/a\\
DATABASE_URL=\"${NEW_URL}\"
" .env
else
    # Add at the beginning
    echo "DATABASE_URL=\"${NEW_URL}\"" >> .env
fi

# Clean up backup file
rm -f .env.bak 2>/dev/null

echo ""
echo "✅ DATABASE_URL updated!"
echo ""
echo "Testing connection..."
npm run test-db

