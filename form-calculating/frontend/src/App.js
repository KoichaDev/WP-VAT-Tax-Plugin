import React, { useState } from 'react';
import ItemProvider from './store/ItemProvider';
import useHttp from './hooks/use-http';
import CalculateItem from './components/Items/CalculateItem';
import Notification from './components/UI/Notification';
import RegisterItem from './components/Items/RegisterItem';
import './Form.scss';

function App() {
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const [notificationContent, setNotificationContent] = useState(null);
  const [isVisible, setIsVisible] = useState(isLoading);

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
      <CalculateItem onClick={calculateItemHandler} />
      {itemModalContent}
    </ItemProvider>
  );
}

export default App;
