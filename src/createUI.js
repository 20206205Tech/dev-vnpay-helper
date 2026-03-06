import { UI_CONFIG } from "./config";

export function createUI(onConfirmCallback) {
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
