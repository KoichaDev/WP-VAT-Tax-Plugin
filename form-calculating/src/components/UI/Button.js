import React from 'react';
import './Button.scss';

function Button({ button, children }) {
  return <button {...button}>{children}</button>;
}

export default Button;
