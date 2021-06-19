import React, { useState, useEffect } from 'react';
import { calculateGrossPrice, calculateNetPrice, calculateTaxAmount } from './calculate-items';
import AddItem from './components/Items/AddItem';
import RegisteredItem from './components/Items/RegisteredItem';
import useHttp from './hooks/use-http';
import './Form.scss';

function App() {
  const [item, setItem] = useState([]);
  const [targetGrossPrice, setTargetGrossPrice] = useState('');
  const [targetNetAmountPrice, setTargetNetAmountPrice] = useState('');
  const [targetTaxAmount, setTargetTaxAmount] = useState('');

  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const onAddItemHandler = async (item) => {
    setItem((prevItem) => [...prevItem, item]);

    const {
      id: targetId,
      finalNetAmount: targetNetAmount,
      productName: targetProductName,
      selectedToCurrency: targetCurrency,
      vatRate: targetVatRate,
    } = item;

    const finalGrossPrice = calculateGrossPrice(targetNetAmount, targetVatRate).toFixed(2);
    const finalTaxAmountPrice = calculateTaxAmount(finalGrossPrice, targetVatRate).toFixed(2);
    const finalNetPrice = calculateNetPrice(finalGrossPrice, finalTaxAmountPrice).toFixed(2);

    setTargetGrossPrice(finalGrossPrice);
    setTargetNetAmountPrice(finalNetPrice);
    setTargetTaxAmount(finalTaxAmountPrice);

    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${targetId}&product-name=${targetProductName}&gross-price=${finalGrossPrice}&tax-amount=${finalTaxAmountPrice}%25&net-amount=${finalNetPrice}&vat-rate=${targetVatRate}%25&currency=${targetCurrency}`;

    sendItemRequest({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      credentials: 'same-origin',
      body: item,
    });
  };

  return (
    <>
      <h1>Calculate Tax and Vat</h1>
      <AddItem onAddItem={onAddItemHandler} />
      {error ? <p>{error}</p> : ''}
      {/* <RegisteredItem /> */}
    </>
  );
}

export default App;
