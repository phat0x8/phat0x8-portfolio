---
title: "OWASP Top 10:2021 Hardening for Flask Behind Cloudflare Zero Trust"
titleVi: "Gia cố Web App Flask Chuẩn OWASP Top 10:2021 Sau Cloudflare Zero Trust"
summary: "Defense-in-depth engineering notes from hardening GetApps Travel Platform on Ubuntu 24.04 LTS with proxy-aware rate limiting, CSP/Bleach XSS mitigation, SSRF checks, and 151/151 Pytest."
summaryVi: "Ghi chép gia cố bảo mật nhiều lớp cho GetApps Travel Platform trên Ubuntu 24.04 LTS: rate limiting nhận diện proxy, chống XSS bằng CSP/Bleach, kiểm soát SSRF và 151/151 test Pytest."
category: "AppSec"
date: "2026-11"
readTime: "~6 min read"
status: "151/151 Tests Pass"
tags: ["OWASP Top 10", "Flask", "Cloudflare Zero Trust", "CSP", "SSRF", "Pytest", "AppSec"]
repoUrl: "https://github.com/phat0x8/GetApps-Travel-Platform"
impact: "151/151 Security Pytest Pass"
impactVi: "151/151 bài kiểm thử bảo mật Pass"
order: 3
---

## 1. Architecture & Threat Model

Deploying a Python Flask web application (`GetApps`) on Ubuntu 24.04 LTS behind **Cloudflare Zero Trust Tunnel (`cloudflared`)** eliminates direct public exposure of origin ports (`80/443/22`), while requiring careful application-layer alignment so security controls evaluate the true client IP rather than the local tunnel loopback address.

## 2. Proxy-Aware Rate Limiting & Security Headers

When traffic arrives through `cloudflared` / reverse proxies, naive rate limiters key on `127.0.0.1` and inadvertently block all users simultaneously.

```python
from flask import request

def get_real_client_ip() -> str:
    """Resolve real client IP behind trusted Cloudflare Tunnel headers."""
    cf_ip = request.headers.get("CF-Connecting-IP")
    if cf_ip:
        return cf_ip.strip()
    xff = request.headers.get("X-Forwarded-For", "")
    return xff.split(",")[0].strip() if xff else (request.remote_addr or "127.0.0.1")
```

### Strict HTTP Response Hardening

- **Content-Security-Policy (CSP):** Restricted script/style/img origins and disallowed inline script execution.
- **Session Cookies:** Enforced `HttpOnly`, `Secure`, and `SameSite=Lax` flags.
- **HTML Sanitization:** Applied `bleach.clean()` allow-listing strictly safe tags on user-generated review fields.

## 3. Magic-Byte File Upload Validation

Never trust the `Content-Type` header or filename extension alone; verify binary file signatures (magic bytes) before saving any uploaded asset.

```python
ALLOWED_SIGNATURES = {
    b"\x89PNG\r\n\x1a\n": "png",
    b"\xff\xd8\xff": "jpg",
    b"RIFF": "webp",
}

def verify_image_magic(stream) -> bool:
    header = stream.read(16)
    stream.seek(0)
    return any(header.startswith(sig) for sig in ALLOWED_SIGNATURES)
```

## 4. SSRF-Safe Redirects & SOC Security Audit Dashboard

- **Open Redirect / SSRF Mitigation:** Validated all `next=` redirect parameters using `urlparse()` to confirm empty `netloc` and relative path prefixes only.
- **Built-in SOC Security Audit Dashboard:** Logged authentication anomalies, rate-limit triggers, rejected file uploads, and CSRF failures into structured audit trails for immediate visibility.

## 5. Verification Results

```bash
pytest -v --tb=short
# Result: 151 passed in 4.82s (0 failed, 0 skipped)
```
