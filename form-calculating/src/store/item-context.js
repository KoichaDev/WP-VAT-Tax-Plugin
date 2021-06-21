import React, { createContext } from 'react';

const ItemContext = createContext({
  item: [],
  enteredProductName: (productValue) => {},
  enteredNetAmount: (netAmountValue) => {},
  selectVatRate: (vatRateValue) => {},
  finalNetAmount: (finalNetAmountValue) => {},
  selectFromCurrency: (currency) => {},
  selectToCurrency: (currency) => {},
});

export default ItemContext;
