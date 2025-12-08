#!/bin/bash

# Build script that temporarily excludes API routes and server-side pages for static export
set -e

echo "Building static site..."

# Clean build cache
rm -rf .next

# Use temp directory outside project
BACKUP_DIR="/tmp/nextjs-build-backup-$$"
mkdir -p $BACKUP_DIR

# Function to restore on exit
cleanup() {
  echo "Restoring directories..."
  if [ -d "$BACKUP_DIR/api" ]; then
    mv $BACKUP_DIR/api app/api 2>/dev/null || true
  fi
  if [ -d "$BACKUP_DIR/admin" ]; then
    mv $BACKUP_DIR/admin app/admin 2>/dev/null || true
  fi
  if [ -d "$BACKUP_DIR/signin" ]; then
    mv $BACKUP_DIR/signin app/signin 2>/dev/null || true
  fi
  rm -rf $BACKUP_DIR
}
trap cleanup EXIT

# Temporarily move API directory and server-side pages
if [ -d "app/api" ]; then
  echo "Temporarily excluding API routes from build..."
  mv app/api $BACKUP_DIR/api
fi

if [ -d "app/admin" ]; then
  echo "Temporarily excluding admin page (server-side) from build..."
  mv app/admin $BACKUP_DIR/admin
fi

if [ -d "app/signin" ]; then
  echo "Temporarily excluding signin page (server-side) from build..."
  mv app/signin $BACKUP_DIR/signin
fi

# Build the static site
npm run build:static

echo "✓ Static build complete! Output in 'out/' directory"
