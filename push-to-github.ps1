# Push to GitHub Helper Script for Aria Lingua-Companion

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Push Aria Lingua-Companion to GitHub   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Ensure we are in the project directory
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

# Check Git installation
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# 1. Check or prompt for Git User Name
$currentName = git config user.name
if (-not $currentName) {
    $nameInput = Read-Host "Enter your Name for Git commits (e.g., Dhaval)"
    if ($nameInput) {
        git config --global user.name "$nameInput"
    }
}

# 2. Check or prompt for Git User Email
$currentEmail = git config user.email
if (-not $currentEmail) {
    $emailInput = Read-Host "Enter your GitHub Email (e.g., yourname@gmail.com)"
    if ($emailInput) {
        git config --global user.email "$emailInput"
    }
}

# 3. Initialize Git if not initialized
if (-not (Test-Path ".git")) {
    git init
    Write-Host "[OK] Git initialized." -ForegroundColor Green
}

# 4. Stage and commit files
git add .
$status = git status --porcelain
if ($status) {
    git commit -m "Initial commit: Aria Multilingual Companion & Spelling Tutor"
    Write-Host "[OK] Changes committed." -ForegroundColor Green
} else {
    Write-Host "[INFO] All files already committed." -ForegroundColor Yellow
}

# 5. Set default branch to main
git branch -M main

# 6. Check remote origin
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host ""
    Write-Host "Please enter your GitHub Repository URL." -ForegroundColor Yellow
    Write-Host "Example: https://github.com/your-username/lingua-companion.git" -ForegroundColor Gray
    $repoUrl = Read-Host "GitHub Repo URL"
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "[OK] Added remote origin: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "No URL provided. Exiting." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Existing remote found: $remoteUrl" -ForegroundColor Cyan
}

# 7. Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub (main branch)..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "  Successfully pushed to GitHub! 🚀       " -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Push encountered an issue. Check your repository URL or permissions." -ForegroundColor Red
}
