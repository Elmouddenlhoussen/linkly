#!/bin/bash

# Linkly Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "🚀 Linkly Deployment Helper"
echo "=========================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📦 Install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is logged in
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub CLI first:"
    gh auth login
fi

echo "✅ GitHub CLI is ready!"
echo ""

# Get repository name
read -p "Enter repository name (default: linkly): " REPO_NAME
REPO_NAME=${REPO_NAME:-linkly}

echo ""
echo "📝 Creating GitHub repository: $REPO_NAME"

# Initialize git if needed
if [ ! -d .git ]; then
    git init
    echo "✅ Git initialized"
fi

# Add all files
git add .
echo "✅ Files staged"

# Commit
git commit -m "Initial commit - Ready for deployment" || echo "⚠️  No changes to commit"

# Create GitHub repo and push
gh repo create $REPO_NAME --public --source=. --remote=origin --push

echo ""
echo "✅ Repository created and pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository: $REPO_NAME"
echo "3. Add environment variables (see DEPLOYMENT_GUIDE.md)"
echo "4. Deploy!"
echo ""
echo "⚠️  IMPORTANT: Use Stripe TEST keys (sk_test_...) to avoid real charges"
echo ""
