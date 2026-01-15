#!/bin/bash
#
# Spec Compliance Check
# Validates project structure against root specifications (REQ-001, REQ-003)
#
# Usage: ./scripts/check-spec-compliance.sh
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

ERRORS=0

check() {
  if [ $1 -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} $2"
  else
    echo -e "  ${RED}✗${NC} $2"
    ERRORS=$((ERRORS + 1))
  fi
}

echo "Checking spec compliance..."
echo ""

# REQ-001: Monorepo CLI - Unified Commands
echo "REQ-001: Monorepo CLI"
grep -q '"build": "pnpm -r run build"' package.json 2>/dev/null
check $? "Unified build command exists"

grep -q '"dev": "pnpm -r run dev"' package.json 2>/dev/null
check $? "Unified dev command exists"

grep -q '"test": "pnpm -r run test"' package.json 2>/dev/null
check $? "Unified test command exists"

grep -q '"clean":' package.json 2>/dev/null
check $? "Unified clean command exists"

echo ""

# REQ-003: Package Standards - TypeScript Strict Mode
echo "REQ-003: TypeScript Strict Mode"

PACKAGES="entry packages/react-sample packages/preact-sample packages/next-sample packages/express-sample packages/nest-sample"

for pkg in $PACKAGES; do
  if [ -f "$pkg/tsconfig.json" ]; then
    grep -q '"strict": true' "$pkg/tsconfig.json" 2>/dev/null
    check $? "$pkg has strict: true"
  else
    check 1 "$pkg/tsconfig.json exists"
  fi
done

echo ""

# REQ-003: Package Standards - Required Scripts
echo "REQ-003: Required Scripts (dev, build, clean)"

for pkg in $PACKAGES; do
  if [ -f "$pkg/package.json" ]; then
    HAS_DEV=$(grep -c '"dev":' "$pkg/package.json" 2>/dev/null || echo 0)
    HAS_BUILD=$(grep -c '"build":' "$pkg/package.json" 2>/dev/null || echo 0)
    HAS_CLEAN=$(grep -c '"clean":' "$pkg/package.json" 2>/dev/null || echo 0)

    if [ "$HAS_DEV" -gt 0 ] && [ "$HAS_BUILD" -gt 0 ] && [ "$HAS_CLEAN" -gt 0 ]; then
      check 0 "$pkg has required scripts"
    else
      check 1 "$pkg has required scripts (dev=$HAS_DEV, build=$HAS_BUILD, clean=$HAS_CLEAN)"
    fi
  else
    check 1 "$pkg/package.json exists"
  fi
done

echo ""

# Summary
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}All compliance checks passed!${NC}"
  exit 0
else
  echo -e "${RED}$ERRORS compliance check(s) failed${NC}"
  exit 1
fi
