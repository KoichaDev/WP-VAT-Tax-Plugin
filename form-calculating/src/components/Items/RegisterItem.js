import React, { useContext } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import ItemContext from './../../store/item-context';
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
    currency,
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
          <h2>Information</h2>
        </header>

        <div className='content'>
          <p>Product Name: {productName}</p>
          <p>Entered Net Amount: {enteredNetAmount}</p>
          <p>
            Converted Net amount: {convertedNetAmount} {currency.toUpperCase()}
          </p>
          <p>
            Gross Price is: {grossProductPrice} {currency.toUpperCase()}
          </p>
          <p>
            Net product price is: {netProductPrice} {currency.toUpperCase()}
          </p>
          <p>Tax Amount is: {taxAmount}%</p>
        </div>

        <footer>
          <button type='submit' onClick={sendRequestHandler.bind(null, itemCtx.item)}>
            Register Item
          </button>
          <button onClick={closeModal}>cancel</button>
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
