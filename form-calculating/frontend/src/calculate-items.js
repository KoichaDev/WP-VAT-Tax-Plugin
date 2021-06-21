export function convertExchangePrice(sourceCurrency, targetCurrency) {
  return sourceCurrency * targetCurrency;
}

export function calculateGrossPrice(netAmount, vatRate) {
  const percentage = vatRate / 100;
  return netAmount + netAmount * percentage;
}

export function calculateNetPrice(grossPrice, taxAmount) {
  return grossPrice - taxAmount;
}

export function calculateTaxAmount(grossPrice, vatRate) {
  return grossPrice * (vatRate / 100);
}
