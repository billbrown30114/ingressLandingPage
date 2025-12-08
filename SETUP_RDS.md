# Setting Up AWS RDS Connection

## Your RDS Instance Details

- **Endpoint**: `tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com`
- **Port**: `5432`
- **Engine**: Aurora PostgreSQL
- **Publicly Accessible**: Yes

## Step 1: Update .env File

Edit your `.env` file and update the `DATABASE_URL` line:

```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/DATABASE_NAME?schema=public"
```

**Replace:**
- `USERNAME` - Your RDS master username (check AWS RDS console → Configuration tab)
- `PASSWORD` - Your RDS master password
- `DATABASE_NAME` - Your database name (often `postgres` or check in RDS console)

**Example:**
```bash
DATABASE_URL="postgresql://postgres:MySecurePassword123@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/postgres?schema=public"
```

## Step 2: Test Connection

```bash
npm run test-db
```

This will verify you can connect to the RDS instance.

## Step 3: Create Database Schema

```bash
npm run db:push
```

This creates all the necessary tables in your RDS database.

## Step 4: Create Admin User

```bash
npm run create-admin billbrown@ingresssoftware.com "Bill Brown"
```

## Step 5: Sign In

Go to `/signin` and use:
- Email: `billbrown@ingresssoftware.com`
- Password: Any password (authentication currently only checks if user exists)

## Troubleshooting

### Connection Timeout
If you get connection timeouts, check:
1. Your IP address is allowed in the security group
2. The security group `tapx-aurora-sg` allows inbound connections on port 5432
3. You may need to add your current IP to the security group

### Authentication Failed
- Double-check username and password
- Ensure special characters in password are URL-encoded in the connection string
- Verify the database name exists

### SSL Connection Required
If RDS requires SSL, add `?sslmode=require` to the connection string:
```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@tapx-postgres-dev-instance-1.c4rvaaueddfa.us-east-1.rds.amazonaws.com:5432/DATABASE_NAME?schema=public&sslmode=require"
```

