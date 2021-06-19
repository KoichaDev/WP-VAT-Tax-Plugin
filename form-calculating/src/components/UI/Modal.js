import React from 'react';
import ReactDOM from 'react-dom';

const BackDrop = ({ onClose }) => {
  const exitModalHandler = (e) => {
    const escKey = e.keyCode === 27;
    if (escKey) {
      setTask('');
    }
  };

  return (
    <div
      role='overlay'
      aria-label='Backdrop'
      aria-visibility='true'
      className='backdrop'
      onClick={onClose}
      onKeyDown={exitModalHandler}></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className='modal'>
      <div className='content'>{children}</div>
    </div>
  );
};

const portalOverlayElement = document.getElementById('overlay');

function Modal({ onClose, children }) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalOverlayElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalOverlayElement)}
    </>
  );
}

export default Modal;
