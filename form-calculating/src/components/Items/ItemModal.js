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

const ModalOverlay = ({ onClick, sendRequest, ...props }) => {
  const { grossPrice, item, netProductPrice, taxAmount } = props;

  let calculatedContent = '';

  if (item.length > 0) {
    const { finalNetAmount, id, productName, selectedToCurrency, vatRate } = item[item.length - 1];

    calculatedContent = (
      <form className='modal' onSubmit={submitHandler}>
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
            <button type='submit' onClick={submitItemHandler}>
              Register Item
            </button>
            <button onClick={onClick}>cancel</button>
          </footer>
        </article>
      </form>
    );
  }

  const submitHandler = (e) => e.preventDefault();

  const submitItemHandler = async () => {
    console.log('clciked');

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

  return <>{calculatedContent}</>;
};

const ItemModal = ({ onClick, sendRequest, ...props }) => {
  return (
    <>
      {createPortal(<Backdrop onClick={onClick} />, document.getElementById('backdrop-root'))}
      {createPortal(
        <ModalOverlay
          {...props}
          onClick={onClick}
          // item={item}
          // targetGrossPrice
          // onConfirm={props.onConfirm}
        />,
        document.getElementById('modal-overlay-root')
      )}
    </>
  );
};

export default ItemModal;
