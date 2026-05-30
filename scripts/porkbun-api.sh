#!/usr/bin/env bash
# Porkbun REST API helper — https://api.porkbun.com/api/json/v3/documentation
#
# Setup:
#   cp .env.porkbun.example .env.porkbun
#   # Keys: https://porkbun.com/account/api
#   # Domain Management → theactivitylab.xyz → Details → API Access = ON
#
# Usage:
#   npm run porkbun:ping
#   npm run porkbun:dns
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${PORKBUN_ENV_FILE:-$ROOT/.env.porkbun}"
API_BASE="https://api.porkbun.com/api/json/v3"
DOMAIN="${PORKBUN_DOMAIN:-theactivitylab.xyz}"

load_env() {
  if [[ -f "$ENV_FILE" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "$ENV_FILE"
    set +a
  fi
}

pb_post() {
  local endpoint="$1"
  local extra="${2:-{}}"
  if [[ -z "${PORKBUN_API_KEY:-}" || -z "${PORKBUN_SECRET_API_KEY:-}" ]]; then
    echo "Missing credentials. Create $ENV_FILE from .env.porkbun.example" >&2
    exit 1
  fi
  curl -sS -X POST "${API_BASE}/${endpoint}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg apikey "$PORKBUN_API_KEY" \
      --arg secretapikey "$PORKBUN_SECRET_API_KEY" \
      --arg extra "$extra" \
      '{apikey: $apikey, secretapikey: $secretapikey} + ((($extra|fromjson?) // {}) | select(type=="object"))')"
}

cmd_ping() {
  echo "==> Porkbun API (no auth)"
  curl -sS -X POST "${API_BASE}/ip" -H "Content-Type: application/json" -d '{}' | jq .
  echo ""
  if [[ -f "$ENV_FILE" ]]; then
    load_env
    echo "==> Porkbun ping (authenticated)"
    resp="$(pb_post "ping" "{}")"
    echo "$resp" | jq .
    if ! echo "$resp" | jq -e '.status == "SUCCESS"' >/dev/null; then
      exit 1
    fi
  else
    echo "No $ENV_FILE — add keys to test authenticated ping"
    exit 1
  fi
}

cmd_dns() {
  load_env
  echo "==> DNS for $DOMAIN"
  pb_post "dns/retrieve/${DOMAIN}" "{}" | jq .
}

usage() {
  cat <<EOF
Usage: $(basename "$0") <command>

Commands:
  ping      Test API + auth (requires .env.porkbun)
  dns       List DNS records for \$PORKBUN_DOMAIN ($DOMAIN)

Docs: https://porkbun.com/api/json/v3/documentation
EOF
}

main() {
  case "${1:-ping}" in
    ping) cmd_ping ;;
    dns) cmd_dns ;;
    -h|--help|help) usage ;;
    *) echo "Unknown: $1"; usage; exit 1 ;;
  esac
}

main "$@"
