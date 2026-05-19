import { processPayment } from "./processPayment";
import { isVNPAYSandbox } from "./getCurrentPage";

function main() {
  // Chỉ chạy trên VNPAY Sandbox
  if (!isVNPAYSandbox()) {
    console.log("%c❌ Script chỉ hoạt động trên VNPAY Sandbox!", "color: red;");
    return;
  }

  // Tự động chạy processPayment khi trang load xong
  window.addEventListener("load", function () {
    // Delay 500ms để đảm bảo các field HTML đã render xong hoàn toàn
    setTimeout(() => {
      processPayment();
    }, 500);
  });
}

main();
