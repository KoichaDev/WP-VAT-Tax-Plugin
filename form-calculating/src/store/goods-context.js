import { createContext } from 'react';

const GoodsContext = createContext({
  items: [],
  enteredProduct: (productName) => {},
  enteredNetAmount: (netAmount) => {},
  enteredVatRate: (vatRate) => {},
  enteredCurrency: (currency) => {},
});

export default GoodsContext;
