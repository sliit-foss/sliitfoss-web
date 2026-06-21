/**
 * SLIIT FOSS membership webhook — appends form submissions to this Google Sheet.
 *
 * One-time setup:
 *   1. Open the target Google Sheet, then Extensions > Apps Script.
 *   2. Replace the default Code.gs with this file and Save.
 *   3. Project Settings (gear icon) > Script properties > Add script property:
 *        SHEETS_WEBHOOK_TOKEN = <a long random secret>
 *   4. Deploy > New deployment > select type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *      Copy the resulting Web app URL.
 *   5. In the site's environment set:
 *        SHEETS_WEBHOOK_URL   = <the Web app URL from step 4>
 *        SHEETS_WEBHOOK_TOKEN = <the same secret from step 3>
 *   6. Redeploy the site. Submissions append as new rows (a header row is
 *      written automatically when the sheet is empty).
 */

var HEADERS = [
  "Submitted At",
  "Name",
  "Email",
  "Student Number",
  "Year",
  "WhatsApp",
  "GitHub",
  "LinkedIn",
  "Website",
  "Employment",
  "Teams",
  "Note"
];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("SHEETS_WEBHOOK_TOKEN");
    if (!expected || body.token !== expected) {
      return json({ ok: false, error: "unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      text(body.name),
      text(body.email),
      text(body.studentId),
      text(body.year),
      text(body.whatsapp),
      body.github || "",
      body.linkedin || "",
      body.website || "",
      text(body.employment),
      text(body.teams),
      text(body.note)
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Prefix values starting with = + - @ so Sheets stores them as text, not a formula.
function text(value) {
  value = value || "";
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
