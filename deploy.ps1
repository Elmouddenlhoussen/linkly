# Linkly Deployment Script for Windows
# This script helps you deploy to GitHub and Vercel

Write-Host "🚀 Linkly Deployment Helper" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Check if gh CLI is installed
try {
    gh --version | Out-Null
} catch {
    Write-Host "❌ GitHub CLI (gh) is not installed." -ForegroundColor Red
    Write-Host "📦 Install it from: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
try {
    gh auth status 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "🔐 Please login to GitHub CLI first:" -ForegroundColor Yellow
        gh auth login
    }
} catch {
    Write-Host "🔐 Please login to GitHub CLI first:" -ForegroundColor Yellow
    gh auth login
}

Write-Host "✅ GitHub CLI is ready!" -ForegroundColor Green
Write-Host ""

# Get repository name
$REPO_NAME = Read-Host "Enter repository name (default: linkly)"
if ([string]::IsNullOrWhiteSpace($REPO_NAME)) {
    $REPO_NAME = "linkly"
}

Write-Host ""
Write-Host "📝 Creating GitHub repository: $REPO_NAME" -ForegroundColor Cyan

# Initialize git if needed
if (-not (Test-Path .git)) {
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
}

# Add all files
git add .
Write-Host "✅ Files staged" -ForegroundColor Green

# Commit
git commit -m "Initial commit - Ready for deployment"
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No changes to commit" -ForegroundColor Yellow
}

# Create GitHub repo and push
gh repo create $REPO_NAME --public --source=. --remote=origin --push

Write-Host ""
Write-Host "✅ Repository created and pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com/new"
Write-Host "2. Import your GitHub repository: $REPO_NAME"
Write-Host "3. Add environment variables (see DEPLOYMENT_GUIDE.md)"
Write-Host "4. Deploy!"
Write-Host ""
Write-Host "⚠️  IMPORTANT: Use Stripe TEST keys (sk_test_...) to avoid real charges" -ForegroundColor Yellow
Write-Host ""
