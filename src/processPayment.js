import { VNPAY_CONFIG } from "./config";
import { fillCardInputs, fillOTPInput } from "./fillInput";
import { getCurrentPage } from "./getCurrentPage";

export function processPayment() {
  const currentPage = getCurrentPage();

  if (currentPage === "INDEX") {
    // Step 1: Fill card information
    console.log("%c📝 Điền thông tin thẻ...", "color: blue; font-weight: bold;");
    fillCardInputs(VNPAY_CONFIG.TEST_CARD);
    console.log("%c✅ Đã điền thẻ test thành công!", "color: green; font-weight: bold;");
  } else if (currentPage === "CONFIRM") {
    // Step 2: Fill OTP code
    console.log("%c📝 Điền mã OTP...", "color: blue; font-weight: bold;");
    const success = fillOTPInput(VNPAY_CONFIG.TEST_OTP);
    if (success) {
      console.log("%c✅ Đã điền OTP thành công!", "color: green; font-weight: bold;");
    } else {
      console.log("%c❌ Không tìm thấy trường OTP!", "color: red; font-weight: bold;");
    }
  }
}
