import React, { useState, useEffect } from 'react';
import { calculateGrossPrice, calculateNetPrice, calculateTaxAmount } from './calculate-items';
import AddItem from './components/Items/RegisterItems/AddItem';
import ItemModal from './components/Items/ItemModal';
import useHttp from './hooks/use-http';
import './Form.scss';

function App() {
  const [item, setItem] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [targetGrossPrice, setTargetGrossPrice] = useState('');
  const [targetNetProductPrice, setTargetNetProductPrice] = useState('');
  const [targetTaxAmount, setTargetTaxAmount] = useState('');

  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  useEffect(() => {
    <ItemModal
      item={item}
      grossPrice={targetGrossPrice}
      netProductPrice={targetNetProductPrice}
      taxAmount={targetTaxAmount}
      onClick={calculateItemHandler}
      closeModal={calculateItemHandler}
      onCloseExit={calculateItemHandler}
    />;
  }, [item]);

  const onAddItemHandler = (item) => {
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
    const finalNetProductPrice = calculateNetPrice(finalGrossPrice, finalTaxAmountPrice).toFixed(2);

    setTargetGrossPrice(finalGrossPrice);
    setTargetNetProductPrice(finalNetProductPrice);
    setTargetTaxAmount(finalTaxAmountPrice);

    // const baseUrl = gsReactScript.url;
    // const nonce = gsReactScript.nonce;
    // const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${targetId}&product-name=${targetProductName}&gross-price=${finalGrossPrice}&tax-amount=${finalTaxAmountPrice}%25&net-amount=${finalNetProductPrice}&vat-rate=${targetVatRate}%25&currency=${targetCurrency}`;

    // sendItemRequest({
    //   url,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-WP-Nonce': nonce,
    //   },
    //   credentials: 'same-origin',
    //   body: item,
    // });
  };

  const calculateItemHandler = () => setIsVisible((prevIsVisible) => !prevIsVisible);

  let itemModalContent = '';

  if (isVisible) {
    itemModalContent = (
      <ItemModal
        item={item}
        grossPrice={targetGrossPrice}
        netProductPrice={targetNetProductPrice}
        taxAmount={targetTaxAmount}
        onClick={calculateItemHandler}
        closeModal={calculateItemHandler}
        onCloseExit={calculateItemHandler}
      />
    );
  }

  return (
    <>
      <h1>Calculate Tax and Vat</h1>
      <AddItem onAddItem={onAddItemHandler} onClick={calculateItemHandler} />
      {error ? <p>{error}</p> : ''}
      {itemModalContent}
    </>
  );
}

export default App;
