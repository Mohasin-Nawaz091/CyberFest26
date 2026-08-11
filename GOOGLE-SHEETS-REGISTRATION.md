# CyberFest Google Sheets Registration

The general registration form now posts to the supplied Google Apps Script Web App.

## Required Google Apps Script

Replace the Apps Script code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.email || "",
      data.phone || "",
      data.university || "",
      data.city || "",
      data.cyberfest ? "Yes" : "No",
      data.ctf ? "Yes" : "No",
      data.workshop ? "Yes" : "No",
      data.networking ? "Yes" : "No",
      data.speakers ? "Yes" : "No",
      data.student ? "Yes" : "No",
      data.level || "",
      data.notes || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Sheet headers

Use these headers in row 1:

`Timestamp | Full Name | Email | Phone | University | City | CyberFest | CTF | Workshop | Networking | Speaker Sessions | Student Community | Experience Level | Notes`

After changing the Apps Script, deploy a **new version** of the Web App and keep **Execute as: Me** and **Who has access: Anyone**.

The website endpoint is already configured in `src/main.jsx`.
