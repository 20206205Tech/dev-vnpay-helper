// ==UserScript==
// @name         VNPAY Sandbox NCB Auto-fill (Full Flow)
// @namespace    20206205.tech
// @version      1.0.0
// @description  Tự động điền thẻ test và mã OTP 123456 trên VNPAY Sandbox
// @author       20206205.tech
// @match        https://sandbox.vnpayment.vn/paymentv2/Ncb/Transaction/Index.html*
// @match        https://sandbox.vnpayment.vn/paymentv2/Ncb/Transaction/Confirm.html*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vnpayment.vn
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // VNPAY Configuration
  const VNPAY_CONFIG = {
    TEST_CARD: {
      number: "9704198526191432198",
      holder: "NGUYEN VAN A",
      issueDate: "07/15",
    },
    TEST_OTP: "123456",
  };

  const UI_CONFIG = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "15px",
    backgroundColor: "#ffffff",
    border: "2px solid #2563eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: "99999",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  };

  function createUI(onConfirmCallback) {
    const container = document.createElement("div");
    
    // Apply styles
    Object.assign(container.style, UI_CONFIG);

    // Create text
    const text = document.createElement("p");
    text.innerText = "VNPAY Helper: Tự động điền?";
    text.style.margin = "0 0 12px 0";
    text.style.fontWeight = "bold";
    container.appendChild(text);

    // Create confirm button
    const btnYes = document.createElement("button");
    btnYes.innerText = "Xác nhận (Fill)";
    btnYes.style.cssText =
      "padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;";

    btnYes.onclick = function () {
      onConfirmCallback();
      container.remove();
    };

    container.appendChild(btnYes);
    document.body.appendChild(container);
  }

  function fillInput(selector, value) {
    const input = document.querySelector(selector);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    }
    return false;
  }

  function fillCardInputs(cardData) {
    const selectors = {
      cardNumber: "#card_number_mask",
      cardHolder: ['#cardHolder', '#card_holder', 'input[name="cardHolder"]'],
      issueDate: ['#issueDate', '#issue_date', 'input[placeholder*="MM/YY"]'],
    };

    // Fill card number
    fillInput(selectors.cardNumber, cardData.number);

    // Fill card holder
    for (const selector of selectors.cardHolder) {
      if (fillInput(selector, cardData.holder)) break;
    }

    // Fill issue date
    for (const selector of selectors.issueDate) {
      if (fillInput(selector, cardData.issueDate)) break;
    }
  }

  function fillOTPInput(otpValue) {
    return fillInput("#otpvalue", otpValue);
  }

  function getCurrentPage() {
    const currentUrl = window.location.href;
    
    if (currentUrl.includes("Index.html")) {
      return "INDEX";
    } else if (currentUrl.includes("Confirm.html")) {
      return "CONFIRM";
    }
    return null;
  }

  function isVNPAYSandbox() {
    return window.location.hostname.includes("sandbox.vnpayment.vn");
  }

  function processPayment() {
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

})();
