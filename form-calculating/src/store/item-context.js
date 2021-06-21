import React, { createContext } from 'react';

const ItemContext = createContext({
  setId: (id) => {},
  setEnteredProductName: (productValue) => {},
  setEnteredNetAmount: (netAmountValue) => {},
  setConvertedNetAmount: (convertedValue) => {},
  selectedCurrency: (currency) => {},
  selectVatRate: (vatRateValue) => {},
  setGrossPrice: (grossPriceValue) => {},
  setTaxAmountPrice: (taxAmountValue) => {},
  setNetProductPrice: (netProductPriceValue) => {},
});

export default ItemContext;
