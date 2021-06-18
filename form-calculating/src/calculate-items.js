export function calculateGrossPrice(netAmount, vatRate) {
  const percentage = vatRate / 100;
  return (netAmount + netAmount * percentage).toFixed(2);
}

export function calculateNetPrice(grossPrice, vatRate) {
  const percentage = vatRate / 100;
  return (grossPrice - grossPrice * percentage).toFixed(2);
}

export function calculateTaxAmount(netAmount, vatRate) {
  return (netAmount * (vatRate / 100)).toFixed(2);
}
