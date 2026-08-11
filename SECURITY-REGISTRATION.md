# CyberFest 2026 Secure Registration

This project is a React + Vite static site deployed on GitHub Pages. Registration data flows from the browser to Google Apps Script and then to Google Sheets. There is no Node backend, SQL database, MongoDB, authentication system, or file upload flow.

## Protections Implemented

- Server-side Apps Script validation for required fields, maximum lengths, email, phone, level, activity values, and selected activity count.
- Unexpected form fields are rejected by Apps Script.
- Honeypot field rejects common bot submissions.
- Client-side validation catches common mistakes before submission.
- Submit button is disabled while submitting to prevent double clicks.
- Client-side cooldown stores only a timestamp, not personal data.
- Apps Script global burst limit and per-email cooldown.
- Apps Script persistent duplicate check by email before writing to the sheet.
- LockService wraps duplicate checks and sheet writes to prevent race-condition duplicates.
- Spreadsheet formula injection is neutralized before writing user-controlled text to Google Sheets.
- Safe generic error messages are returned to the browser.
- GitHub Pages compatible iframe/postMessage response flow allows the frontend to distinguish success, validation errors, duplicate/rate-limit responses, and server errors.
- Optional Cloudflare Turnstile integration point is available without exposing the secret in frontend code.
- Meta CSP is included for the current static frontend, Google Fonts, Unsplash images, Apps Script form target/frame, and optional Turnstile.

## Important Limitations

Google Apps Script is still a public API endpoint. It is not a DDoS firewall, and frontend JavaScript cannot stop network-level abuse. For a high-profile public event, use Cloudflare/WAF/CDN protections and consider putting a Cloudflare Worker with rate limiting in front of Apps Script.

GitHub Pages does not let this repository configure real HTTP security headers. The included CSP is a meta tag for browser-side enforcement; stronger headers require hosting behind infrastructure that can set headers, such as Cloudflare.

Origin/Referer headers are not reliably available to Apps Script `doPost(e)`. The posted `clientOrigin` is used only to choose a safe `postMessage` target, not as a primary security control.

## Apps Script Deployment

1. Open the CyberFest Google Sheet.
2. Extensions -> Apps Script.
3. Replace the current code with `google-apps-script/Code.gs`.
4. Confirm the tab is named `Sheet1`.
5. Save.
6. Deploy -> Manage deployments -> Edit.
7. Select a new version and deploy.
8. Execute as: Me.
9. Who has access: Anyone.

## Turnstile Setup

Turnstile is optional until credentials are configured.

Frontend:

```powershell
$env:VITE_TURNSTILE_SITE_KEY='your-public-site-key'
npm run build
```

Apps Script:

1. Apps Script -> Project Settings -> Script Properties.
2. Add `TURNSTILE_SECRET`.
3. Set it to your Cloudflare Turnstile secret key.
4. Deploy a new Apps Script version.

If `TURNSTILE_SECRET` is absent, Apps Script does not require a token. If `VITE_TURNSTILE_SITE_KEY` is absent, the frontend does not render the Turnstile widget.

## Not Applicable To Current Architecture

- SQL/NoSQL injection: no SQL, MongoDB, Firebase, or similar database is used.
- File upload security: the current form has no file uploads.
- SSRF/RCE/command injection/directory traversal in this repo: the static frontend performs no server-side URL fetching, OS command execution, dynamic filesystem access, or server-side processing.
- Brute-force login protection: there is no authentication or login flow.
