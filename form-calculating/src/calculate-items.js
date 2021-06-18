// const amountInUSD = convertToUSD(currency, amount);
// const amountInOutputCurrency = convertFromUSD(currency, amountInUSD);

export function convertFromExchangeCurrencyPrice(targetCurrency, sourceCurrency) {
  return;
}

export function convertToExchangePrice(sourceCurrency, targetCurrency) {
  return sourceCurrency * targetCurrency;
}

export function calculateCurrencyPrice(fromCurrency, toCurrency) {
  return fromCurrency * toCurrency;
}

export function calculateGrossPrice(netAmount, vatRate) {
  const percentage = vatRate / 100;
  return netAmount + netAmount * percentage;
}

export function calculateNetPrice(grossPrice, vatRate) {
  const percentage = vatRate / 100;
  return grossPrice - grossPrice * percentage;
}

export function calculateTaxAmount(netAmount, vatRate) {
  return netAmount * (vatRate / 100);
}
