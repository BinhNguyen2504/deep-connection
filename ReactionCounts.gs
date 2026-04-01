/**
 * Google Apps Script — Deep Connection Reaction Counts
 *
 * Sheet tab: "ReactionCounts"
 *   Column A: category  (string)
 *   Column B: question_id (number)
 *   Column C: likes (number)
 *   Column D: dislikes (number)
 *
 * Deploy as Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Endpoints:
 *   GET  → returns all reaction counts as JSON
 *   POST → upsert reaction count for a question
 */

var SHEET_NAME = 'ReactionCounts';

// ────────────── GET: Return all reaction counts ──────────────
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Sheet not found' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues();
  var result = {};

  // Skip header row (row 0)
  for (var i = 1; i < data.length; i++) {
    var category = String(data[i][0]);
    var questionId = String(data[i][1]);
    var likes = Number(data[i][2]) || 0;
    var dislikes = Number(data[i][3]) || 0;

    if (!category) continue;

    if (!result[category]) result[category] = {};
    result[category][questionId] = { likes: likes, dislikes: dislikes };
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', data: result }),
  ).setMimeType(ContentService.MimeType.JSON);
}

// ────────────── POST: Upsert reaction ──────────────
function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Invalid JSON' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var category = String(body.category || '');
  var questionId = String(body.question_id || '');
  var vote = String(body.vote || ''); // "likes" or "dislikes"
  var action = String(body.action || ''); // "add", "remove", "switch"

  if (!category || !questionId || !vote || !action) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Missing fields' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Sheet not found' }),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var data = sheet.getDataRange().getValues();
    var rowIndex = -1;

    // Find existing row (skip header)
    for (var i = 1; i < data.length; i++) {
      if (
        String(data[i][0]) === category &&
        String(data[i][1]) === questionId
      ) {
        rowIndex = i + 1; // 1-based row number
        break;
      }
    }

    var likes, dislikes;

    if (rowIndex === -1) {
      // Row doesn't exist — create new row
      likes = vote === 'likes' && action !== 'remove' ? 1 : 0;
      dislikes = vote === 'dislikes' && action !== 'remove' ? 1 : 0;
      sheet.appendRow([category, questionId, likes, dislikes]);
    } else {
      // Row exists — update counts
      likes = Number(data[rowIndex - 1][2]) || 0;
      dislikes = Number(data[rowIndex - 1][3]) || 0;

      if (action === 'add') {
        if (vote === 'likes') likes++;
        else dislikes++;
      } else if (action === 'remove') {
        if (vote === 'likes') likes = Math.max(0, likes - 1);
        else dislikes = Math.max(0, dislikes - 1);
      } else if (action === 'switch') {
        if (vote === 'likes') {
          likes++;
          dislikes = Math.max(0, dislikes - 1);
        } else {
          dislikes++;
          likes = Math.max(0, likes - 1);
        }
      }

      sheet.getRange(rowIndex, 3).setValue(likes);
      sheet.getRange(rowIndex, 4).setValue(dislikes);
    }

    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok', likes: likes, dislikes: dislikes }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    lock.releaseLock();
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
