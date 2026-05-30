#!/usr/bin/env python3
"""Sync theactivitylab.xyz DNS on Porkbun — Vercel web + Porkbun email forwarding.

Official Porkbun API v3 docs: https://porkbun.com/api/json/v3/documentation

Email forwarding addresses (hello@ → inbox) are configured in the Porkbun dashboard;
this script only ensures the MX/SPF records Porkbun requires for forwarding to work.

Usage:
  python3 scripts/porkbun-dns-activity-lab.py           # audit (dry run)
  python3 scripts/porkbun-dns-activity-lab.py --apply # write missing records
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

API_BASE = "https://api.porkbun.com/api/json/v3"
ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = Path(os.environ.get("PORKBUN_ENV_FILE", ROOT / ".env.porkbun"))

VERCEL_APEX_A = "76.76.21.21"
VERCEL_WWW_CNAME = "cname.vercel-dns.com"
PORKBUN_SPF = "v=spf1 include:_spf.porkbun.com ~all"

REQUIRED_WEB = [
    ("A", "", VERCEL_APEX_A),
    ("CNAME", "www", VERCEL_WWW_CNAME),
]

REQUIRED_EMAIL = [
    ("MX", "", "fwd1.porkbun.com", 10),
    ("MX", "", "fwd2.porkbun.com", 20),
    ("TXT", "", PORKBUN_SPF, None),
]


def load_env(path: Path) -> None:
    if not path.is_file():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = val


def pb_post(path: str, body: dict | None = None) -> dict:
    api_key = os.environ.get("PORKBUN_API_KEY", "")
    secret = os.environ.get("PORKBUN_SECRET_API_KEY", "")
    if not api_key or not secret:
        raise SystemExit(
            "Missing PORKBUN_API_KEY or PORKBUN_SECRET_API_KEY in .env.porkbun\n"
            "  https://porkbun.com/account/api"
        )

    payload = {"apikey": api_key, "secretapikey": secret, **(body or {})}
    req = urllib.request.Request(
        f"{API_BASE}/{path.lstrip('/')}",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode()
        raise SystemExit(f"HTTP {exc.code} {path}: {detail}") from exc


def normalize_host(name: str, domain: str) -> str:
    if not name or name == domain:
        return ""
    suffix = f".{domain}"
    if name.endswith(suffix):
        label = name[: -len(suffix)]
        return "" if not label else label
    return name


def fetch_records(domain: str) -> list[dict]:
    resp = pb_post(f"dns/retrieve/{domain}")
    if resp.get("status") != "SUCCESS":
        raise SystemExit(f"dns/retrieve failed: {json.dumps(resp)}")
    return resp.get("records") or []


def has_mx(records: list[dict], domain: str, host: str, content: str, prio: int) -> bool:
    for rec in records:
        if rec.get("type") != "MX":
            continue
        if normalize_host(rec.get("name") or "", domain) != host:
            continue
        if (rec.get("content") or "") != content:
            continue
        if str(rec.get("prio") or "") != str(prio):
            continue
        return True
    return False


def has_txt(records: list[dict], domain: str, host: str, content: str) -> bool:
    for rec in records:
        if rec.get("type") != "TXT":
            continue
        if normalize_host(rec.get("name") or "", domain) != host:
            continue
        if (rec.get("content") or "") != content:
            continue
        return True
    return False


def has_record(records: list[dict], domain: str, rtype: str, host: str, content: str) -> bool:
    for rec in records:
        if rec.get("type") != rtype:
            continue
        if normalize_host(rec.get("name") or "", domain) != host:
            continue
        if (rec.get("content") or "") != content:
            continue
        return True
    return False


def create_record(
    domain: str,
    rtype: str,
    host: str,
    content: str,
    prio: int | None = None,
    notes: str = "",
) -> None:
    body: dict = {"type": rtype, "content": content, "ttl": 600}
    if host:
        body["name"] = host
    if prio is not None:
        body["prio"] = prio
    if notes:
        body["notes"] = notes
    label = host or "@"
    extra = f" prio={prio}" if prio is not None else ""
    print(f"  create {rtype} {label}{extra} → {content}")
    out = pb_post(f"dns/create/{domain}", body)
    if out.get("status") != "SUCCESS":
        raise SystemExit(f"create failed: {json.dumps(out)}")


def print_audit(records: list[dict], domain: str) -> None:
    print(f"\n==> DNS audit: {domain}")
    for rec in sorted(records, key=lambda r: (r.get("type", ""), r.get("name") or "")):
        rtype = rec.get("type", "")
        host = normalize_host(rec.get("name") or "", domain) or "@"
        content = rec.get("content") or ""
        prio = rec.get("prio")
        suffix = f" (prio {prio})" if rtype == "MX" and prio else ""
        print(f"  {rtype:6} {host:22} {content[:64]}{suffix}")


def ensure_stack(records: list[dict], domain: str, apply: bool) -> None:
    print("\n==> Ensuring web records (Vercel)...")
    for rtype, host, content in REQUIRED_WEB:
        if has_record(records, domain, rtype, host, content):
            print(f"  ok {rtype} {host or '@'}")
            continue
        if not apply:
            print(f"  missing {rtype} {host or '@'} → {content}")
        else:
            create_record(domain, rtype, host, content, notes="managed-by=the-activity-lab vercel")

    print("\n==> Ensuring email records (Porkbun forwarding)...")
    for rtype, host, content, prio in REQUIRED_EMAIL:
        ok = (
            has_mx(records, domain, host, content, prio)
            if rtype == "MX" and prio is not None
            else has_txt(records, domain, host, content)
        )
        if ok:
            print(f"  ok {rtype} {host or '@'} → {content}")
            continue
        if not apply:
            label = f" prio {prio}" if prio else ""
            print(f"  missing {rtype} {host or '@'}{label} → {content}")
        else:
            create_record(
                domain,
                rtype,
                host,
                content,
                prio=prio,
                notes="managed-by=the-activity-lab porkbun-email",
            )


def main() -> None:
    load_env(ENV_FILE)
    domain = os.environ.get("PORKBUN_DOMAIN", "theactivitylab.xyz")
    apply = "--apply" in sys.argv

    records = fetch_records(domain)
    print_audit(records, domain)
    ensure_stack(records, domain, apply=apply)

    if not apply:
        print("\nDry run. Re-run with --apply to write changes.")
        print(
            "\nAfter DNS is applied, create the forward in Porkbun:"
            f"\n  hello@{domain} → $PORKBUN_FORWARD_TO (or FORM_INBOX_EMAIL)"
            "\n  Domain Management → theactivitylab.xyz → Email (envelope icon)"
        )


if __name__ == "__main__":
    main()
