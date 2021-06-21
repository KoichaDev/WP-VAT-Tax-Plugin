import React, { useReducer } from 'react';
import ItemContext from './item-context';

const ACTION = {
  ENTERED_ID: 'entered-id',
  ENTERED_PRODUCT_NAME: 'entered-product-name',
  ENTERED_NET_AMOUNT: 'entered-net-amount',
  CONVERTED_NET_AMOUNT: 'converted-net-amount',
  SELECTED_TO_CURRENCY: 'selected-to-currency',
  SELECTED_VAT_RATE: 'vat-rate',
  ENTERED_GROSS_PRODUCT_PRICE: 'gross-price',
  ENTERED_NET_PRODUCT_PRICE: 'net-amount',
  ENTERED_TAX_AMOUNT: 'tax-amount',
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case ACTION.ENTERED_ID:
      return { ...state, id: action.id };
    case ACTION.ENTERED_PRODUCT_NAME:
      return { ...state, productName: action.enteredProductName };
    case ACTION.ENTERED_NET_AMOUNT:
      return { ...state, enteredNetAmount: action.enteredNetAmount };
    case ACTION.CONVERTED_NET_AMOUNT:
      return { ...state, convertedNetAmount: action.newTargetValue };
    case ACTION.SELECTED_TO_CURRENCY:
      return { ...state, currency: action.selectedToCurrency };
    case ACTION.SELECTED_VAT_RATE:
      return { ...state, vatRate: action.vatRate };
    case ACTION.ENTERED_GROSS_PRODUCT_PRICE:
      return { ...state, grossProductPrice: action.targetGrossPrice };
    case ACTION.ENTERED_NET_PRODUCT_PRICE:
      return { ...state, netProductPrice: action.targetNetProductPrice };
    case ACTION.ENTERED_TAX_AMOUNT:
      return { ...state, taxAmount: action.targetTaxAmountPrice };
    default:
      return state;
  }
};

const defaultItemState = {
  id: '',
  productName: '',
  enteredNetAmount: '',
  convertedNetAmount: '',
  currency: 'pln',
  grossProductPrice: '',
  netProductPrice: '',
  taxAmount: '',
  vatRate: 25,
};

function ItemProvider({ children }) {
  const [itemState, dispatchItemAction] = useReducer(itemReducer, defaultItemState);

  const idHandler = ({ id }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_ID,
      id,
    });
  };

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

  const setCurrencyHandler = ({ selectedToCurrency }) => {
    dispatchItemAction({
      type: ACTION.SELECTED_CURRENCY,
      selectedToCurrency,
    });
  };

  const vatRateHandler = ({ vatRate }) => {
    dispatchItemAction({
      type: ACTION.SELECTED_VAT_RATE,
      vatRate,
    });
  };

  const grossPriceHandler = ({ targetGrossPrice }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_GROSS_PRODUCT_PRICE,
      targetGrossPrice,
    });
  };

  const taxAmountPriceHandler = ({ targetTaxAmountPrice }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_TAX_AMOUNT,
      targetTaxAmountPrice,
    });
  };

  const netProductPriceHandler = ({ targetNetProductPrice }) => {
    dispatchItemAction({
      type: ACTION.ENTERED_NET_PRODUCT_PRICE,
      targetNetProductPrice,
    });
  };

  const itemContext = {
    item: itemState,
    setId: idHandler,
    setEnteredProductName: productNameHandler,
    setEnteredNetAmount: netAmountPriceHandler,
    setConvertedNetAmount: convertedNetAmountPriceHandler,
    selectVatRate: vatRateHandler,
    setCurrency: setCurrencyHandler,
    setGrossPrice: grossPriceHandler,
    setTaxAmountPrice: taxAmountPriceHandler,
    setNetProductPrice: netProductPriceHandler,
  };

  return <ItemContext.Provider value={itemContext}>{children}</ItemContext.Provider>;
}

export default ItemProvider;
