import React from 'react';

function FormResult({ calculateItem }) {
  const lastUpdatedProduct = calculateItem[calculateItem.length - 1];
  const { currency, productName, netAmount, vatRate } = lastUpdatedProduct;
  return (
    <ul>
      <li>
        <p>Product name: {productName}</p>
      </li>
      <li>
        <p>
          Gross product price is: {123} {currency.toUpperCase()}
        </p>
      </li>
      <li>
        <p>Vat Rate: {vatRate}%</p>
      </li>
      <li>
        <p>Tax amount is: {}</p>
      </li>
    </ul>
  );
}

export default FormResult;
