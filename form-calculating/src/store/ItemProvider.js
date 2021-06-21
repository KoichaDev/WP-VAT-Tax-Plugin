import React, { useReducer } from 'react';
import ItemContext from './item-context';

const ACTION = {
  ENTERED_PRODUCT_NAME: 'entered-product-name',
  ENTERED_NET_AMOUNT: 'entered-net-amount',
  CONVERTED_NET_AMOUNT: 'converted-net-amount',
  SELECTED_VAT_RATE: 'vat-rate',
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ENTERED_PRODUCT_NAME:
      return { ...state, productName: action.enteredProductName };
    case ACTION.ENTERED_NET_AMOUNT:
      return { ...state, enteredNetAmount: action.enteredNetAmount };
    case ACTION.CONVERTED_NET_AMOUNT:
      return { ...state, convertedNetAmount: action.newTargetValue };
    case ACTION.SELECTED_VAT_RATE:
      return { ...state, vatRate: action.vatRate };
    default:
      return state;
  }
};

const defaultItemState = {
  productName: '',
  enteredNetAmount: '',
  convertedNetAmount: '',
  vatRate: 25,
};

function ItemProvider({ children }) {
  const [itemState, dispatchItemAction] = useReducer(itemReducer, defaultItemState);
  console.log(itemState);
  const productNameHandler = ({ enteredProductName }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_PRODUCT_NAME,
      enteredProductName,
    });
  };

  const netAmountPriceHandler = ({ enteredNetAmount }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_NET_AMOUNT,
      enteredNetAmount,
    });
  };

  const convertedNetAmountPriceHandler = ({ newTargetValue }) => {
    dispatchItemAction({
      type: ACTION.CONVERTED_NET_AMOUNT,
      newTargetValue,
    });
  };

  const vatRateHandler = ({ vatRate }) => {
    dispatchItemAction({
      type: ACTION.SELECTED_VAT_RATE,
      vatRate,
    });
  };

  const itemContext = {
    item: itemState,
    setEnteredProductName: productNameHandler,
    setEnteredNetAmount: netAmountPriceHandler,
    setConvertedNetAmount: convertedNetAmountPriceHandler,
    selectFromCurrency: (currency) => {},
    selectToCurrency: (currency) => {},
    selectVatRate: vatRateHandler,
  };

  return <ItemContext.Provider value={itemContext}>{children}</ItemContext.Provider>;
}

export default ItemProvider;
