import React, { useContext } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import ItemContext from './../../store/item-context';
import Button from './../UI/Button';
import './RegisterItem.scss';

const Backdrop = ({ closeModal, onCloseExit }) => {
  const exitModalHandler = (e) => {
    const escKey = e.keyCode === 27;

    if (escKey) {
      onCloseExit;
    }
  };

  return (
    <div
      role='backdrop-overlay'
      aria-label='Backdrop'
      className='backdrop'
      onClick={closeModal}
      onKeyDown={exitModalHandler}></div>
  );
};

const ModalOverlay = ({ closeModal, onAddNotification, setIsVisible, sendItemRequest }) => {
  const itemCtx = useContext(ItemContext);

  const sendRequestHandler = async (props) => {
    const { id, productName, currency, grossProductPrice, netProductPrice, taxAmount, vatRate } = props;

    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&gross-price=${grossProductPrice}&tax-amount=${taxAmount}%25&net-amount=${netProductPrice}&vat-rate=${vatRate}%25&currency=${currency}`;

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
      // Switching off the calculation register item modal
      setIsVisible(false);
    });
  };

  const {
    productName,
    enteredNetAmount,
    convertedNetAmount,
    fromCurrency,
    toCurrency,
    grossProductPrice,
    netProductPrice,
    taxAmount,
    vatRate,
  } = itemCtx.item;

  let calculatedContent = '';

  calculatedContent = (
    <form className='modal' onSubmit={(e) => e.preventDefault()}>
      <article>
        <header>
          <h2>🧾 Information</h2>
        </header>

        <div className='content'>
          <p>
            <strong>Product Name:</strong> {productName}
          </p>
          <p>
            <strong>Entered Net Amount: </strong>
            {enteredNetAmount} {fromCurrency.toUpperCase()}
          </p>
          <p>
            <strong>Converted Net amount: </strong>
            {convertedNetAmount} {toCurrency.toUpperCase()}
          </p>
          <p>
            <strong>Gross Price is: </strong>
            {grossProductPrice} {toCurrency.toUpperCase()}
          </p>
          <p>
            <strong>Net product price is: </strong>
            {netProductPrice} {toCurrency.toUpperCase()}
          </p>
          <p>
            <strong> Tax Amount is: </strong>
            {taxAmount}%
          </p>
        </div>

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
              onClick: closeModal,
              className: 'btn btn--warning',
            }}>
            <strong>❌ CANCEL </strong>
          </Button>
        </footer>
      </article>
    </form>
  );

  return <>{calculatedContent}</>;
};

const RegisterItem = ({
  closeModal,
  isVisible,
  onAddNotification,
  setIsVisible,
  sendItemRequest,
  ...props
}) => {
  let backDropContent = '';
  let modalOverlayContent = '';

  if (isVisible) {
    backDropContent = (
      <>{createPortal(<Backdrop closeModal={closeModal} />, document.getElementById('backdrop-root'))}</>
    );
  }

  if (isVisible) {
    modalOverlayContent = (
      <>
        {createPortal(
          <ModalOverlay
            {...props}
            onAddNotification={onAddNotification}
            sendItemRequest={sendItemRequest}
            setIsVisible={setIsVisible}
            closeModal={closeModal}
          />,
          document.getElementById('modal-overlay-root')
        )}
      </>
    );
  }

  return (
    <>
      {backDropContent}
      {modalOverlayContent}
    </>
  );
};

export default RegisterItem;
