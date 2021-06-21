import React, { useReducer } from 'react';
import ItemContext from './item-context';

const ACTION = {
  ENTERED_PRODUCT_NAME: 'entered-product-name',
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ENTERED_PRODUCT_NAME:
      return { ...state, item: { productName: action.productName } };
    default:
      return state;
  }
};

function ItemProvider({ children }) {
  const [itemState, dispatchItemAction] = useReducer(itemReducer, { item: [] });

  const productNameHandler = ({ productName }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_PRODUCT_NAME,
      productName,
    });
  };

  const itemContext = {
    item: itemState.item,
    enteredProductName: productNameHandler,
    enteredNetAmount: (netAmountValue) => {},
    selectVatRate: (vatRateValue) => {},
    finalNetAmount: (finalNetAmountValue) => {},
    selectFromCurrency: (currency) => {},
    selectToCurrency: (currency) => {},
  };

  return <ItemContext.Provider value={itemContext}>{children}</ItemContext.Provider>;
}

export default ItemProvider;
