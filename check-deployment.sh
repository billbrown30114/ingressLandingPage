#!/bin/bash
# Check Amplify deployment status
APP_ID="d1zt1na9fbodzm"
BRANCH="main"
PROFILE="ingress"
REGION="us-east-1"

LATEST_JOB=$(aws amplify list-jobs --app-id $APP_ID --branch-name $BRANCH --profile $PROFILE --region $REGION --max-results 1 --output json | jq -r '.jobSummaries[0]')
JOB_ID=$(echo $LATEST_JOB | jq -r '.jobId')
STATUS=$(echo $LATEST_JOB | jq -r '.status')
START_TIME=$(echo $LATEST_JOB | jq -r '.startTime')

echo "Latest Deployment:"
echo "  Job ID: $JOB_ID"
echo "  Status: $STATUS"
echo "  Started: $START_TIME"
echo ""

if [ "$STATUS" = "SUCCEED" ]; then
  echo "✅ Deployment successful!"
elif [ "$STATUS" = "FAILED" ]; then
  echo "❌ Deployment failed. Check logs:"
  aws amplify get-job --app-id $APP_ID --branch-name $BRANCH --job-id $JOB_ID --profile $PROFILE --region $REGION --output json | jq -r '.job.steps[] | select(.status == "FAILED") | "  - \(.stepName): \(.status)"'
elif [ "$STATUS" = "PENDING" ] || [ "$STATUS" = "PROVISIONING" ] || [ "$STATUS" = "BUILDING" ] || [ "$STATUS" = "DEPLOYING" ]; then
  echo "⏳ Deployment in progress..."
  aws amplify get-job --app-id $APP_ID --branch-name $BRANCH --job-id $JOB_ID --profile $PROFILE --region $REGION --output json | jq -r '.job.steps[] | select(.status == "PENDING" or .status == "PROVISIONING" or .status == "BUILDING" or .status == "DEPLOYING") | "  Current step: \(.stepName) - \(.status)"'
else
  echo "Status: $STATUS"
fi
