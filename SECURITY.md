# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Privacy & Security Architecture

Roxonic Invoice is intentionally engineered as an **offline-first** desktop application:
- **No Cloud Telemetry**: Invoices, customer records, and product pricing are stored locally on the user's computer inside Chromium's local application storage.
- **No Remote Tracking**: No analytics, phone-home services, or remote telemetry are embedded.
- **External Links**: External URLs opened from the application are routed through the operating system's default browser via Electron's `shell.openExternal`.

## Code Signing & Certificates

- Development signing scripts generate **self-signed certificates** purely for local testing.
- Self-signed certificates (`certs/*.pfx`) are strictly excluded from version control via `.gitignore`.
- **Never publish, commit, or distribute private certificate files.**

## Reporting a Vulnerability

If you discover a security vulnerability in Roxonic Invoice:
1. Please **do not** report security issues in public GitHub issues.
2. Send a detailed report via email to **security@roxoniclimited.com** or **roxoniclimited@gmail.com**.
3. Include:
   - Type of issue (e.g., Electron IPC exposure, local privilege escalation, XSS in rendered invoice preview).
   - Step-by-step instructions to reproduce the vulnerability.
   - Proof-of-concept code or demonstration if available.
4. We will acknowledge receipt within 48 hours and work with you to resolve the issue responsibly.
