import React, { createContext } from 'react';

const ItemContext = createContext({
  enteredProductName: (productValue) => {},
  enteredNetAmount: (netAmountValue) => {},
  finalNetAmount: (finalNetAmountValue) => {},
  selectFromCurrency: (currency) => {},
  selectToCurrency: (currency) => {},
  selectVatRate: (vatRateValue) => {},
});

export default ItemContext;
