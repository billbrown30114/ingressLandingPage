#!/bin/bash
echo "=== RDS Connection Diagnostics ==="
echo ""

# Get RDS instance info
DB_INSTANCE=$(aws rds describe-db-instances --profile ingress --region us-east-1 --output json 2>&1 | jq -r '.DBInstances[] | select(.DBInstanceIdentifier | contains("tapx")) | .DBInstanceIdentifier' | head -1)
if [ -z "$DB_INSTANCE" ]; then
  echo "❌ No RDS instance found with 'tapx' in name"
  exit 1
fi

echo "RDS Instance: $DB_INSTANCE"
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier "$DB_INSTANCE" --profile ingress --region us-east-1 --output json 2>&1)
ENDPOINT=$(echo "$RDS_INFO" | jq -r '.DBInstances[0].Endpoint.Address')
PUBLIC=$(echo "$RDS_INFO" | jq -r '.DBInstances[0].PubliclyAccessible')
VPC_ID=$(echo "$RDS_INFO" | jq -r '.DBInstances[0].DBSubnetGroup.VpcId')
SG_ID=$(echo "$RDS_INFO" | jq -r '.DBInstances[0].VpcSecurityGroups[0].VpcSecurityGroupId')

echo "  Endpoint: $ENDPOINT"
echo "  Publicly Accessible: $PUBLIC"
echo "  VPC: $VPC_ID"
echo "  Security Group: $SG_ID"
echo ""

# Check security group rules
echo "=== Security Group Rules ==="
SG_RULES=$(aws ec2 describe-security-groups --group-ids "$SG_ID" --profile ingress --region us-east-1 --output json 2>&1)
echo "$SG_RULES" | jq -r '.SecurityGroups[0].IpPermissions[] | select(.FromPort == 5432 or .FromPort == null) | "  Port \(.FromPort // "all"): \(.IpProtocol)\n  Sources: \(.IpRanges[].CidrIp // "none")"'

echo ""
echo "=== Amplify App Network ==="
AMPLIFY_INFO=$(aws amplify get-app --app-id d1zt1na9fbodzm --profile ingress --region us-east-1 --output json 2>&1)
echo "$AMPLIFY_INFO" | jq -r '.app | "  Platform: \(.platform)\n  Repository: \(.repository)"'

echo ""
echo "=== Analysis ==="
if [ "$PUBLIC" = "false" ]; then
  echo "⚠️  RDS is NOT publicly accessible - Amplify needs VPC configuration"
fi

HAS_PUBLIC_ACCESS=$(echo "$SG_RULES" | jq -r '.SecurityGroups[0].IpPermissions[] | select(.FromPort == 5432) | .IpRanges[] | select(.CidrIp == "0.0.0.0/0") | .CidrIp')
if [ -z "$HAS_PUBLIC_ACCESS" ]; then
  echo "⚠️  Security group does not allow public access (0.0.0.0/0) on port 5432"
else
  echo "✅ Security group allows public access on port 5432"
fi
