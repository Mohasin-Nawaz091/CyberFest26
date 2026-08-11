# CyberFest 2026 — Secure Google Sheets Registration

This version hardens the public registration form while keeping Google Sheets as the database.

## What is protected

- Server-side validation in Google Apps Script.
- Hidden honeypot field to reject common bots.
- Maximum lengths for every field.
- Email and experience-level validation.
- At least one CyberFest activity required.
- Per-email cooldown: 10 minutes.
- Global burst limit: 60 accepted requests/minute.
- LockService prevents concurrent writes/race conditions.
- Client-side validation and a 30-second cooldown.
- URL-encoded POST avoids unnecessary CORS preflight.

## Important limitation

Google Apps Script is NOT a DDoS firewall. A determined attacker can still send traffic directly to the public `/exec` URL and potentially consume Apps Script quotas. For a high-profile public event, the next security layer should be Cloudflare Turnstile (CAPTCHA-style bot verification) and, ideally, a Cloudflare Worker/rate limiter in front of the Apps Script endpoint.

Do not put a secret API key in the React frontend; anything shipped to the browser is public.

## Apps Script deployment

1. Open the CyberFest Google Sheet.
2. Extensions -> Apps Script.
3. Replace the current code with `google-apps-script/Code.gs`.
4. Confirm the tab is named `Sheet1`.
5. Save.
6. Deploy -> Manage deployments -> Edit.
7. Select a new version and deploy.
8. Execute as: Me.
9. Who has access: Anyone.
10. Keep the existing Web App URL in the React app.

## Sheet columns

Timestamp | Full Name | Email | Phone | University | City | CyberFest | CTF | Workshop | Networking | Speaker Sessions | Student Community | Experience Level | Notes

## Frontend

The registration form now sends `application/x-www-form-urlencoded` data to Apps Script and treats a successful network handoff as submission success. Google Apps Script's `no-cors` response cannot be read by the browser, so the frontend cannot display server-side rejection details. The server still validates and rejects bad requests before writing.

For the strongest production setup, add Cloudflare Turnstile before launch.
