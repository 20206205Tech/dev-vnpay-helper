export function fillInput(selector, value) {
  const input = document.querySelector(selector);
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  return false;
}

export function fillCardInputs(cardData) {
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

export function fillOTPInput(otpValue) {
  return fillInput("#otpvalue", otpValue);
}
