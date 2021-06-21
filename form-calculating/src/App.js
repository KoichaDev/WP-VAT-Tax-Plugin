import React, { useState } from 'react';
import ItemProvider from './store/ItemProvider';
import useHttp from './hooks/use-http';
import { calculateGrossPrice, calculateNetPrice, calculateTaxAmount } from './calculate-items';
import CalculateItem from './components/Items/CalculateItem';
import Notification from './components/UI/Notification';
import RegisterItem from './components/Items/RegisterItem';
import './Form.scss';

function App() {
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const [item, setItem] = useState([]);
  const [notificationContent, setNotificationContent] = useState(null);
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

  // This handler will be used to notify the user that post has been updated
  const notificationHandler = (item) => {
    const closeNotificationHandler = () => setNotificationContent(null);

    let notificationMessage = (
      <p aria-label={`Post has been created ${item?.title}`}>
        Your Post <strong>{item?.title}</strong> has been created
      </p>
    );

    if (error) {
      notificationMessage = <p aria-label={error}>{error}</p>;
    }

    setNotificationContent(() => {
      return (
        <Notification onClick={closeNotificationHandler} error={error}>
          {notificationMessage}
        </Notification>
      );
    });
  };

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
    <ItemProvider>
      {notificationContent}
      <h1>Calculate Tax and Vat</h1>
      <CalculateItem onAddItem={onAddItemHandler} isVisible={isVisible} onClick={calculateItemHandler} />
      {itemModalContent}
    </ItemProvider>
  );
}

export default App;
