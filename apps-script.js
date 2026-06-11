// =============================================================
//  The 10% Movement — Google Apps Script Webhook
//  Deploy this at: script.google.com → New project → paste → Deploy
//  Deploy as: Web app · Execute as: Me · Who has access: Anyone
//
//  After deploying, copy the web app URL into Vercel as:
//  APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
// =============================================================

var SPREADSHEET_ID = "1lpx0N3wJICbfTmxJuthw0dLRWqdUCGlmNtLK1dkSpcQ";
var RESEARCH_SHEET_NAME = "10% Research Cohort Submissions";
var NEWSLETTER_SHEET_NAME = "10% Newsletter Submissions";

// Column headers for each sheet — order matters, matches the append below
var RESEARCH_HEADERS = [
  "First Name", "Last Name", "Email", "Institution", "Career Stage",
  "Research Field", "Problem / Research Focus", "Underserved Population",
  "Strongest Work", "Connection to Movement", "What Science Gets Wrong",
  "Resume / CV Link", "LinkedIn", "Website", "Submitted At"
];

var NEWSLETTER_HEADERS = [
  "First Name", "Last Name", "Email", "Author Bio",
  "Submission Type", "Title", "Abstract / Summary",
  "Full Paper Link", "Mission Compliance", "Submitted At"
];

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var data = JSON.parse(raw);
    var type = data.type;

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheetName = type === "research" ? RESEARCH_SHEET_NAME : NEWSLETTER_SHEET_NAME;
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = type === "research" ? RESEARCH_HEADERS : NEWSLETTER_HEADERS;
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }

    // Deduplicate: remove any existing row with the same email
    var email = (data.email || "").toLowerCase().trim();
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var emailCol = 3; // Email is column 3 (1-indexed) in both sheets
      var emailRange = sheet.getRange(2, emailCol, lastRow - 1, 1).getValues();
      for (var i = emailRange.length - 1; i >= 0; i--) {
        if ((emailRange[i][0] || "").toLowerCase().trim() === email) {
          sheet.deleteRow(i + 2); // +2: 1-indexed + skip header row
          break;
        }
      }
    }

    var timestamp = new Date().toISOString();
    var row;

    if (type === "research") {
      row = [
        data.firstName || "",
        data.lastName || "",
        email,
        data.institution || "",
        data.careerStage || "",
        data.researchField || "",
        data.researchFocus || "",
        data.underservedPopulation || "",
        data.significantWork || "",
        data.contribution || "",
        data.scienceGetsWrong || "",
        data.resumeUrl || "",
        data.linkedin || "",
        data.website || "",
        timestamp
      ];
    } else {
      row = [
        data.firstName || "",
        data.lastName || "",
        email,
        data.bio || "",
        data.submissionType || "",
        data.title || "",
        data.abstract || "",
        data.paperUrl || "",
        data.compliance ? "Yes" : "No",
        timestamp
      ];
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles CORS preflight — not strictly needed for server-to-server calls
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
