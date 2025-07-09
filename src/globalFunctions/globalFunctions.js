export function toCurrency(no, digits = 0, showSymbol = false) {
  // If second arg is boolean, it's actually showSymbol
  if (typeof digits === "boolean") {
    showSymbol = digits;
    digits = 0;
  }

  return no.toLocaleString("en-IN", {
    style: showSymbol ? "currency" : "decimal",
    currency: "INR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
