import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import './ItemModal.scss';

const Backdrop = ({ onClick, onCloseExit }) => {
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
      onClick={onClick}
      onKeyDown={exitModalHandler}></div>
  );
};

const ModalOverlay = ({ onClick, setIsVisible, sendItemRequest, ...props }) => {
  const sendRequestHandler = async (props) => {
    // todo: refactor the props shit...
    const { grossPrice, item, netProductPrice, taxAmount } = props;

    const latestItem = item[item.length - 1];
    const {
      finalNetAmount,
      id: targetId,
      productName: targetProductName,
      selectedToCurrency: targetCurrency,
      vatRate: targetVatRate,
    } = latestItem;
    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;

    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${targetId}&product-name=${targetProductName}&gross-price=${grossPrice}&tax-amount=${taxAmount}%25&net-amount=${netProductPrice}&vat-rate=${targetVatRate}%25&currency=${targetCurrency}`;

    sendItemRequest({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': nonce,
      },
      credentials: 'same-origin',
      body: props,
    });
    setIsVisible(false);
  };

  let calculatedContent = '';

  if (props.item.length > 0) {
    const { grossPrice, item, netProductPrice, taxAmount } = props;

    const latestItem = item[item.length - 1];
    const { finalNetAmount, id, productName, selectedToCurrency, vatRate } = latestItem;

    calculatedContent = (
      <form className='modal' onSubmit={(e) => e.preventDefault()}>
        <article>
          <header>
            <h2>Information</h2>
          </header>

          <div className='content'>
            <p>
              Gross Price is: {grossPrice} {selectedToCurrency.toUpperCase()}
            </p>
            <p>
              Net product price is: {netProductPrice} {selectedToCurrency.toUpperCase()}
            </p>
            <p>Tax Amount is: {taxAmount}%</p>
          </div>

          <footer>
            <button type='submit' onClick={sendRequestHandler.bind(null, props)}>
              Register Item
            </button>
            <button onClick={onClick}>cancel</button>
          </footer>
        </article>
      </form>
    );
  }

  return <>{calculatedContent}</>;
};

const ItemModal = ({ onClick, isVisible, setIsVisible, sendItemRequest, ...props }) => {
  let backDropContent = '';
  let modalOverlayContent = '';

  if (isVisible) {
    backDropContent = (
      <>{createPortal(<Backdrop onClick={onClick} />, document.getElementById('backdrop-root'))}</>
    );
  }

  if (isVisible) {
    modalOverlayContent = (
      <>
        {createPortal(
          <ModalOverlay
            {...props}
            sendItemRequest={sendItemRequest}
            setIsVisible={setIsVisible}
            onClick={onClick}
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

export default ItemModal;
