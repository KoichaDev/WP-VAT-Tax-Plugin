import React, { createContext } from 'react';

const ItemContext = createContext({
  setEnteredProductName: (productValue) => {},
  setEnteredNetAmount: (netAmountValue) => {},
  setConvertedNetAmount: (convertedValue) => {},
  selectFromCurrency: (currency) => {},
  selectToCurrency: (currency) => {},
  selectVatRate: (vatRateValue) => {},
});

export default ItemContext;
