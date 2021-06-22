import React from 'react';
import './Backdrop.scss';

function Backdrop({ children }) {
  return (
    <div role='backdrop-overlay' aria-label='Backdrop' className='backdrop'>
      {children}
    </div>
  );
}

export default Backdrop;
