export const STORAGE_KEY = "authorized";
export const ENV_DEV = "DEV";
export const ENV_PROD = "PROD";
export const ISS_MAP = {
  "https://fcpszufggnlztfglyysr.supabase.co/auth/v1": ENV_DEV,
  "https://umcfsqjxpmawkzwuhwdp.supabase.co/auth/v1": ENV_PROD,
};

// VNPAY Configuration
export const VNPAY_CONFIG = {
  INDEX_URL: "https://sandbox.vnpayment.vn/paymentv2/Ncb/Transaction/Index.html",
  CONFIRM_URL: "https://sandbox.vnpayment.vn/paymentv2/Ncb/Transaction/Confirm.html",
  TEST_CARD: {
    number: "9704198526191432198",
    holder: "NGUYEN VAN A",
    issueDate: "07/15",
  },
  TEST_OTP: "123456",
};

export const UI_CONFIG = {
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
