#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-${SMOKE_BASE_URL:-http://localhost:3000}}"
BASE_URL="${BASE_URL%/}"

check_get() {
  local path="$1"
  local name="$2"

  local tmp
  tmp="$(mktemp)"

  local status
  status="$(curl -sS -m 15 -o "$tmp" -w "%{http_code}" "$BASE_URL$path" || true)"

  if [[ "$status" != "200" ]]; then
    echo "[FAIL] $name -> $BASE_URL$path (status: $status)"
    echo "Response:"
    sed -n '1,20p' "$tmp"
    rm -f "$tmp"
    return 1
  fi

  local body
  body="$(cat "$tmp")"
  rm -f "$tmp"

  if [[ -z "$body" || "$body" == "[]" ]]; then
    echo "[WARN] $name returned empty body"
  fi

  echo "[OK] $name -> $BASE_URL$path"
  return 0
}

echo "Smoke check target: $BASE_URL"

check_get "/api/health" "API health"
check_get "/api/np/areas" "Nova Poshta areas"

echo "All smoke checks passed."
