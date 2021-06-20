import React, { useState, useEffect } from 'react';
import useHttp from './hooks/use-http';
import { calculateGrossPrice, calculateNetPrice, calculateTaxAmount } from './calculate-items';
import CalculateItem from './components/Items/CalculateItem';
import RegisterItem from './components/Items/RegisterItem';
import './Form.scss';

function App() {
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const [item, setItem] = useState([]);
  const [isVisible, setIsVisible] = useState(isLoading);
  const [targetGrossPrice, setTargetGrossPrice] = useState('');
  const [targetNetProductPrice, setTargetNetProductPrice] = useState('');
  const [targetTaxAmount, setTargetTaxAmount] = useState('');

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
  };

  const calculateItemHandler = () => setIsVisible((prevIsVisible) => !prevIsVisible);

  const notificationHandler = (item) => console.log(item);

  let itemModalContent = '';

  if (isVisible) {
    itemModalContent = (
      <RegisterItem
        item={item}
        grossPrice={targetGrossPrice}
        netProductPrice={targetNetProductPrice}
        taxAmount={targetTaxAmount}
        closeModal={calculateItemHandler}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        sendItemRequest={sendItemRequest}
        onAddNotification={notificationHandler}
      />
    );
  }

  return (
    <>
      <h1>Calculate Tax and Vat</h1>
      <CalculateItem onAddItem={onAddItemHandler} isVisible={isVisible} onClick={calculateItemHandler} />
      {itemModalContent}
    </>
  );
}

export default App;
