import { createUI } from "./createUI";
import { processPayment } from "./processPayment";
import { isVNPAYSandbox } from "./getCurrentPage";

function main() {
  // Chỉ chạy trên VNPAY Sandbox
  if (!isVNPAYSandbox()) {
    console.log("%c❌ Script chỉ hoạt động trên VNPAY Sandbox!", "color: red;");
    return;
  }

  // Khởi tạo UI
  window.addEventListener("load", function () {
    createUI(() => {
      processPayment();
    });
  });
}

main();
