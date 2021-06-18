import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Form />
    </React.StrictMode>,
    document.getElementById('cost-calculator-root')
  );
});
