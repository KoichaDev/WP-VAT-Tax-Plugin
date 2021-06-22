import React, { useState, useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import ItemProvider from './store/ItemProvider';
import useHttp from './hooks/use-http';
import Backdrop from './components/UI/Backdrop';
import CalculateItem from './components/Items/CalculateItem';
import LoadingIcon from './components/Icons/LoadingIcon';
import Notification from './components/UI/Notification';
import RegisterItem from './components/Items/RegisterItem';
import './App.scss';

function App() {
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();
  const [notificationContent, setNotificationContent] = useState(null);
  const [isVisible, setIsVisible] = useState(isLoading);
  const [backdropIsVisible, setBackdropIsVisible] = useState(false);

  const calculateItemHandler = () => setIsVisible((prevIsVisible) => !prevIsVisible);

  // Triggering the backdrop visibility as soon user click to calculate the item
  useEffect(() => {
    if (isVisible) {
      setBackdropIsVisible(true);
    }
  }, [isVisible]);

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
      setBackdropIsVisible(false);
      return (
        <Notification onClick={closeNotificationHandler} error={error}>
          {notificationMessage}
        </Notification>
      );
    });
  };

  let registerModalContent = '';
  let backdropContent = '';

  if (backdropIsVisible) {
    backdropContent = (
      <>
        {createPortal(
          <Backdrop>
            <LoadingIcon className='loading-animation' />
          </Backdrop>,
          document.getElementById('backdrop-portal')
        )}
      </>
    );
  }

  if (isVisible) {
    registerModalContent = (
      <RegisterItem
        setBackdropIsVisible={setBackdropIsVisible}
        setIsVisible={setIsVisible}
        sendItemRequest={sendItemRequest}
        onAddNotification={notificationHandler}
      />
    );
  }

  return (
    <ItemProvider>
      {backdropContent}
      {notificationContent}
      <h1>Calculate Product Price </h1>
      <CalculateItem onClick={calculateItemHandler} />
      {registerModalContent}
    </ItemProvider>
  );
}

export default App;
