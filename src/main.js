import { processPayment } from "./processPayment";
import { isVNPAYSandbox } from "./getCurrentPage";

function main() {
  // console.log("123");

  // Chỉ chạy trên VNPAY Sandbox
  if (!isVNPAYSandbox()) {
    console.log("%c❌ Script chỉ hoạt động trên VNPAY Sandbox!", "color: red;");
    return;
  }

  // CÁCH SỬA: Kiểm tra xem trang đã load xong chưa. 
  // Nếu xong rồi thì chạy luôn, nếu chưa thì mới gán sự kiện load.
  const runPayment = () => {
    setTimeout(() => {
      processPayment();
    }, 1000); // Tăng delay lên một chút (1000ms) cho chắc ăn vì VNPAY render UI khá chậm
  };

  if (document.readyState === "complete") {
    runPayment();
  } else {
    window.addEventListener("load", runPayment);
  }
}

main();
