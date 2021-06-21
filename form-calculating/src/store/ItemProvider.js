import React, { useReducer } from 'react';
import ItemContext from './item-context';

const ACTION = {
  ENTERED_PRODUCT_NAME: 'entered-product-name',
  ENTERED_NET_AMOUNT: 'entered-net-amount',
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ENTERED_PRODUCT_NAME:
      return { ...state, productName: action.enteredProductName };
    case ACTION.ENTERED_NET_AMOUNT:
      return { ...state, enteredNetAmount: action.enteredNetAmount };
    default:
      return state;
  }
};

const defaultItemState = {
  productName: '',
  enteredNetAmount: 0,
};

function ItemProvider({ children }) {
  const [itemState, dispatchItemAction] = useReducer(itemReducer, defaultItemState);

  const productNameHandler = ({ enteredProductName }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_PRODUCT_NAME,
      enteredProductName,
    });
  };

  const netAmountPriceHandler = ({ enteredNetAmount }) => {
    console.log(enteredNetAmount);
    dispatchItemAction({
      type: ACTION.ENTERED_NET_AMOUNT,
      enteredNetAmount,
    });
  };

  const itemContext = {
    item: itemState,
    enteredProductName: productNameHandler,
    enteredNetAmount: netAmountPriceHandler,
    selectVatRate: (vatRateValue) => {},
    finalNetAmount: (finalNetAmountValue) => {},
    selectFromCurrency: (currency) => {},
    selectToCurrency: (currency) => {},
  };

  return <ItemContext.Provider value={itemContext}>{children}</ItemContext.Provider>;
}

export default ItemProvider;
