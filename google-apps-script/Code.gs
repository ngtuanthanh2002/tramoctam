/**
 * ============================================================
 * HƯỚNG DẪN GẮN SCRIPT VÀO GOOGLE SHEET
 * ============================================================
 * 1. Mở sheet: https://docs.google.com/spreadsheets/d/1UpFApad_gJzVLAosvp_G5wIcr6Me7XWUWVyNTSH27us
 * 2. Extensions (Tiện ích mở rộng) → Apps Script
 * 3. Xóa code mặc định, dán TOÀN BỘ file này vào → Save (Ctrl+S)
 * 4. Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me (tôi)
 *    - Who has access: Anyone (bất kỳ ai)
 * 5. Copy URL dạng: https://script.google.com/macros/s/XXXX/exec
 * 6. Dán URL đó vào SCRIPT_URL trong src/components/OrderForm.tsx
 *
 * Cột trên Sheet (tự tạo header nếu trống):
 * A: Thời gian | B: Họ tên | C: SĐT | D: Địa chỉ | E: Gói mua | F: Giá
 * ============================================================
 */

var SPREADSHEET_ID = "1UpFApad_gJzVLAosvp_G5wIcr6Me7XWUWVyNTSH27us";
var SHEET_NAME = "Trang tính1"; // đổi nếu bạn đổi tên tab

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Order API sẵn sàng" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var fullName = (data.fullName || data.full_name || "").toString().trim();
    var phone = (data.phone || data.phone_number || "").toString().trim();
    var address = (data.address || "").toString().trim();
    var packageLabel = (data.packageLabel || data.package || "").toString().trim();
    var price = data.price || "";

    if (!fullName || !phone || !address) {
      return jsonResponse({ ok: false, error: "Thiếu thông tin bắt buộc" });
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian",
        "Họ và tên",
        "Số điện thoại",
        "Địa chỉ",
        "Gói mua",
        "Giá",
      ]);
    }

    var now = Utilities.formatDate(
      new Date(),
      "Asia/Ho_Chi_Minh",
      "dd/MM/yyyy HH:mm:ss"
    );

    sheet.appendRow([now, fullName, phone, address, packageLabel, price]);

    return jsonResponse({ ok: true, message: "Đã ghi nhận đơn hàng" });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
