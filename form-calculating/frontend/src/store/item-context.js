import React, { createContext } from 'react';

// This is used for IDE code hinting

const ItemContext = createContext({
  setId: (id) => {},
  setEnteredProductName: (productValue) => {},
  setEnteredNetAmount: (netAmountValue) => {},
  setConvertedNetAmount: (convertedValue) => {},
  selectedFromCurrency: (selectedFromCurrency) => {},
  selectedToCurrency: (selectedToCurrency) => {},
  selectVatRate: (vatRateValue) => {},
  setGrossPrice: (grossPriceValue) => {},
  setTaxAmountPrice: (taxAmountValue) => {},
  setNetProductPrice: (netProductPriceValue) => {},
});

export default ItemContext;
