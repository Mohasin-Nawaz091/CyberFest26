# CyberFest Google Sheets Registration

The public registration form posts to the Google Apps Script Web App endpoint configured in `src/main.jsx`.

## Required Apps Script

Use the hardened Apps Script in `google-apps-script/Code.gs`.

Deployment steps:

1. Open the CyberFest Google Sheet.
2. Go to Extensions -> Apps Script.
3. Replace the Apps Script code with `google-apps-script/Code.gs`.
4. Confirm the sheet tab is named `Sheet1`.
5. Save the script.
6. Deploy -> Manage deployments -> Edit.
7. Select a new version and deploy.
8. Use Execute as: Me.
9. Use Who has access: Anyone.
10. Keep the existing Web App URL in `src/main.jsx`.

## Sheet Headers

Use these headers in row 1:

`Timestamp | Full Name | Email | Phone | University | City | CyberFest | CTF | Workshop | Networking | Speaker Sessions | Student Community | Experience Level | Notes`

## Optional Turnstile

Cloudflare Turnstile requires two values:

- Frontend public site key: set `VITE_TURNSTILE_SITE_KEY` before building the Vite app.
- Server secret key: set Apps Script Script Property `TURNSTILE_SECRET`.

Never put the Turnstile secret key in React or any file that ships to GitHub Pages.
