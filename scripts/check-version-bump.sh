#!/bin/bash

# Check if version has been bumped compared to main branch
# Usage: ./scripts/check-version-bump.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Don't check if we're already on main
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
  echo -e "${YELLOW}On main branch, skipping version check${NC}"
  exit 0
fi

# Ensure we have the latest main branch
git fetch origin main:main 2>/dev/null || git fetch origin master:master 2>/dev/null || true

# Get version from current branch
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Get version from main branch
MAIN_VERSION=$(git show origin/main:package.json 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8')).version" 2>/dev/null) || \
MAIN_VERSION=$(git show origin/master:package.json 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8')).version" 2>/dev/null) || \
MAIN_VERSION=$(git show main:package.json 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8')).version" 2>/dev/null) || \
MAIN_VERSION=$(git show master:package.json 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8')).version" 2>/dev/null)

if [ -z "$MAIN_VERSION" ]; then
  echo -e "${YELLOW}Warning: Could not determine version from main branch${NC}"
  echo -e "${YELLOW}Skipping version check${NC}"
  exit 0
fi

echo "Current version: $CURRENT_VERSION"
echo "Main version: $MAIN_VERSION"

if [ "$CURRENT_VERSION" = "$MAIN_VERSION" ]; then
  echo -e "${RED}❌ Version has not been bumped!${NC}"
  echo -e "${RED}Please update the version in package.json before merging to main.${NC}"
  echo ""
  echo "You can bump the version using:"
  echo "  pnpm version patch  # for bug fixes (0.0.1 -> 0.0.2)"
  echo "  pnpm version minor  # for new features (0.0.1 -> 0.1.0)"
  echo "  pnpm version major  # for breaking changes (0.0.1 -> 1.0.0)"
  exit 1
fi

echo -e "${GREEN}✅ Version has been bumped from $MAIN_VERSION to $CURRENT_VERSION${NC}"
exit 0




