import React, { useState, useReducer, useEffect } from 'react';
import GoodsContext from './goods-context';

const ACTION = {
  ADD_PRODUCT: 'add-todo',
  ADD_NET_AMOUNT: 'add-net-amount',
  ADD_VAT_RATE: 'add-vat-rate',
  ADD_CURRENCY: 'add-currency',
};

const GoodsReducer = (goods, action) => {
  switch (action.type) {
    case ACTION.ADD_PRODUCT:
      const updatedTasks = goods.items.concat(action.product);
      return { ...goods, updatedTasks };
    default:
      return goods;
  }
};

function GoodsProvider({ children }) {
  const [goodsState, dispatchGoodsState] = useReducer(GoodsReducer, { items: [] });
  const enteredProductHandler = (product) => {
    dispatchGoodsState({
      type: ACTION.ADD_PRODUCT,
      product,
    });
  };

  const goodsContext = {
    items: goodsState.items,
    enteredProduct: enteredProductHandler,
    enteredNetAmount: (netAmount) => {},
    enteredVatRate: (vatRate) => {},
    enteredCurrency: (currency) => {},
  };
  return <GoodsContext.Provider value={goodsContext}>{children}</GoodsContext.Provider>;
}

export default GoodsProvider;
