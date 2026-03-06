export function getCurrentPage() {
  const currentUrl = window.location.href;
  
  if (currentUrl.includes("Index.html")) {
    return "INDEX";
  } else if (currentUrl.includes("Confirm.html")) {
    return "CONFIRM";
  }
  return null;
}

export function isVNPAYSandbox() {
  return window.location.hostname.includes("sandbox.vnpayment.vn");
}
