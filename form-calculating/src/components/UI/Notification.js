import React from 'react';
import './Notification.scss';

function Notification({ error, onClick, children }) {
  return (
    <div className={error ? 'error' : 'notification'}>
      {children}
      <button
        className='notification__button'
        aria-label='Close success notification message'
        title='Close success notification message'
        onClick={onClick}>
        Gotcha! 👍
      </button>
    </div>
  );
}

export default Notification;
