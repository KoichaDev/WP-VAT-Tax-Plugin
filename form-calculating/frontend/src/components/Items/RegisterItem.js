import React, { useState, useContext } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import ItemContext from '../../store/item-context';
import LoadingIcon from './../Icons/LoadingIcon';
import Button from '../UI/Button';
import './RegisterItem.scss';

const RegisterItemOverlay = ({ onAddNotification, setBackdropIsVisible, setIsVisible, sendItemRequest }) => {
  const itemCtx = useContext(ItemContext);

  const sendRequestHandler = async (props) => {
    const { id, productName, toCurrency, grossProductPrice, netProductPrice, taxAmount, vatRate } = props;
    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&gross-price=${grossProductPrice}&tax-amount=${taxAmount}&net-amount=${netProductPrice}&vat-rate=${vatRate}%25&currency=${toCurrency.toUpperCase()}`;

    const sentItem = sendItemRequest({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      credentials: 'same-origin',
      body: props,
    });

    // We want to save the sentItem state as latestPost to use it in context for updating out notification component
    // It let's the end user to see the post has been updated as well as they can click on the custom post type to see the content
    sentItem.then((item) => {
      // Lifting up the state for notification Component
      onAddNotification(item);
    });

    // Switching off the calculation register item modal after submitting the POST HTTP Request
    setIsVisible(false);
  };

  const closeModalHandler = () => {
    setBackdropIsVisible(false);
    setIsVisible(false);
  };

  return (
    <form className='modal' onSubmit={(e) => e.preventDefault()}>
      <article>
        <header>
          <h2>🧾 Information</h2>
        </header>
        <p>
          <strong>Product Name:</strong> {itemCtx.item.productName}
        </p>
        <p>
          <strong>Entered Net Amount: </strong>
          {itemCtx.item.enteredNetAmount} {itemCtx.item.fromCurrency.toUpperCase()}
        </p>
        <p>
          <strong>Converted Net amount: </strong>
          {itemCtx.item.convertedNetAmount} {itemCtx.item.toCurrency.toUpperCase()}
        </p>
        <p>
          <strong>Vat Rate: </strong> {itemCtx.item.vatRate}%
        </p>
        <p>
          <strong>Gross Price is: </strong>
          {itemCtx.item.grossProductPrice} {itemCtx.item.toCurrency.toUpperCase()}
        </p>
        <p>
          <strong>Net product price is: </strong>
          {itemCtx.item.netProductPrice} {itemCtx.item.toCurrency.toUpperCase()}
        </p>
        <p>
          <strong> Tax Amount is: </strong>
          {itemCtx.item.taxAmount} {itemCtx.item.toCurrency.toUpperCase()}
        </p>

        <footer className='modal__footer'>
          <Button
            button={{
              type: 'submit',
              className: 'btn',
              onClick: sendRequestHandler.bind(null, itemCtx.item),
            }}>
            <strong>🚀 Register Item </strong>
          </Button>
          <Button
            button={{
              onClick: closeModalHandler,
              className: 'btn btn--warning',
            }}>
            <strong>❌ CANCEL </strong>
          </Button>
        </footer>
      </article>
    </form>
  );
};

const RegisterItem = ({
  onAddNotification,
  setBackdropIsVisible,
  setIsVisible,
  sendItemRequest,
  ...props
}) => {
  return (
    <>
      {createPortal(
        <RegisterItemOverlay
          setBackdropIsVisible={setBackdropIsVisible}
          onAddNotification={onAddNotification}
          sendItemRequest={sendItemRequest}
          setIsVisible={setIsVisible}
          {...props}
        />,
        document.getElementById('register-item-portal')
      )}
    </>
  );
};

export default RegisterItem;
