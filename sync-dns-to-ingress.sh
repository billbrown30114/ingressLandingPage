#!/bin/bash
# Sync DNS records from cadOPS to ingress account and update nameservers

set -e

CADOPS_ZONE_ID="Z02487992JMDOAZYX0AII"
INGRESS_ZONE_ID="Z0738557QXENNYFAFTWH"

echo "Step 1: Fetching all records from cadOPS zone..."
aws route53 list-resource-record-sets --profile cadOPS --hosted-zone-id $CADOPS_ZONE_ID --output json > /tmp/cadops_all_records.json

echo "Step 2: Fetching current records from ingress zone..."
aws route53 list-resource-record-sets --profile ingress --hosted-zone-id $INGRESS_ZONE_ID --output json > /tmp/ingress_current_records.json

echo "Step 3: Creating change batch..."
python3 << 'PYTHON_SCRIPT'
import json

with open('/tmp/cadops_all_records.json', 'r') as f:
    cadops_data = json.load(f)

with open('/tmp/ingress_current_records.json', 'r') as f:
    ingress_data = json.load(f)

# Create lookup of existing records in ingress
ingress_lookup = {}
for record in ingress_data['ResourceRecordSets']:
    if record['Type'] not in ['NS', 'SOA']:
        key = f"{record['Name']}|{record['Type']}"
        ingress_lookup[key] = record

# Build change batch
changes = []
for record in cadops_data['ResourceRecordSets']:
    if record['Type'] in ['NS', 'SOA']:
        continue
    
    key = f"{record['Name']}|{record['Type']}"
    
    # Check if record exists and is different
    if key not in ingress_lookup:
        # Record doesn't exist, create it
        change = {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": record['Name'],
                "Type": record['Type'],
                "TTL": record['TTL']
            }
        }
        
        if 'ResourceRecords' in record:
            change["ResourceRecordSet"]["ResourceRecords"] = record['ResourceRecords']
        elif 'AliasTarget' in record:
            change["ResourceRecordSet"]["AliasTarget"] = record['AliasTarget']
        
        changes.append(change)
        print(f"  Adding: {record['Name']} {record['Type']}")
    else:
        # Record exists, check if it needs updating
        existing = ingress_lookup[key]
        if existing.get('TTL') != record.get('TTL') or \
           existing.get('ResourceRecords') != record.get('ResourceRecords') or \
           existing.get('AliasTarget') != record.get('AliasTarget'):
            change = {
                "Action": "UPSERT",
                "ResourceRecordSet": {
                    "Name": record['Name'],
                    "Type": record['Type'],
                    "TTL": record['TTL']
                }
            }
            
            if 'ResourceRecords' in record:
                change["ResourceRecordSet"]["ResourceRecords"] = record['ResourceRecords']
            elif 'AliasTarget' in record:
                change["ResourceRecordSet"]["AliasTarget"] = record['AliasTarget']
            
            changes.append(change)
            print(f"  Updating: {record['Name']} {record['Type']}")

if changes:
    change_batch = {
        "Changes": changes,
        "Comment": "Sync DNS records from cadOPS to ingress account"
    }
    
    with open('/tmp/change-batch.json', 'w') as f:
        json.dump(change_batch, f, indent=2)
    
    print(f"\nTotal changes: {len(changes)}")
else:
    print("\nNo changes needed - all records are already synced")
PYTHON_SCRIPT

if [ -f /tmp/change-batch.json ]; then
    echo ""
    echo "Step 4: Applying changes to ingress hosted zone..."
    CHANGE_ID=$(aws route53 change-resource-record-sets \
        --profile ingress \
        --hosted-zone-id $INGRESS_ZONE_ID \
        --change-batch file:///tmp/change-batch.json \
        --query 'ChangeInfo.Id' --output text)
    
    echo "Change submitted: $CHANGE_ID"
    echo "Waiting for change to propagate..."
    aws route53 wait resource-record-sets-changed --profile ingress --id $CHANGE_ID
    echo "✓ Changes applied successfully"
else
    echo "No changes to apply"
fi

echo ""
echo "Step 5: Getting ingress nameservers..."
INGRESS_NS=$(aws route53 get-hosted-zone --profile ingress --id $INGRESS_ZONE_ID \
    --query 'DelegationSet.NameServers' --output json | jq -r '.[]')

echo "Ingress nameservers:"
echo "$INGRESS_NS" | while read ns; do
    echo "  - $ns"
done

echo ""
echo "Step 6: Updating domain registration nameservers..."
# Convert nameservers to AWS format
NS_ARRAY=$(echo "$INGRESS_NS" | jq -R -s -c 'split("\n") | map(select(. != "")) | map({Name: .})')

aws route53domains update-domain-nameservers \
    --profile ingress \
    --domain-name ingresssoftware.com \
    --nameservers $(echo "$INGRESS_NS" | jq -R -s 'split("\n") | map(select(. != "")) | map({Name: .})' | jq -c '.') \
    --region us-east-1

echo "✓ Nameservers updated"
echo ""
echo "Transfer complete! DNS is now managed from ingress account."
echo "Note: Nameserver changes can take up to 48 hours to fully propagate."
