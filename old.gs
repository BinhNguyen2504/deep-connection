const SHEET_NAME = 'Feedback';

function doPost(e) {
  try {
    // Apps Script vẫn parse được cục JSON dạng text bình thường
    const data = JSON.parse(e.postData.contents);
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Category', 'Question ID', 'Vote']);
    }
    sheet.appendRow([
      data.timestamp,
      data.category,
      data.question_id,
      data.vote,
    ]);

    // Set MimeType trả về để trình duyệt không bị bối rối
    return ContentService.createTextOutput('ok').setMimeType(
      ContentService.MimeType.TEXT,
    );
  } catch (error) {
    // Bắt lỗi để trả về thông báo nếu parse JSON hỏng
    return ContentService.createTextOutput('error').setMimeType(
      ContentService.MimeType.TEXT,
    );
  }
}
