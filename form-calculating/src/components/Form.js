import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FormResult from './FormResult';
import './Form.scss';

function Form() {
  const [productName, setProductName] = useState('');
  const [netAmount, setNetAmount] = useState('');
  const [vatRate, setVatRate] = useState(25);
  const [currency, setCurrency] = useState('nok');
  const [calculateResult, setCalculateResult] = useState([]);

  const enteredProductHandler = (e) => setProductName(e.target.value);

  const enteredNetAmountHandler = (e) => setNetAmount(parseInt(e.target.value));

  const vatRateHandler = (e) => setVatRate(parseInt(e.target.value));

  const currencyHandler = (e) => setCurrency(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();
    setCalculateResult((prevCalculaterResult) => [
      ...prevCalculaterResult,
      {
        id: uuidv4(),
        productName,
        netAmount,
        vatRate,
        currency,
      },
    ]);

    // Reset input field to empty string after submitting the form
    setProductName('');
    setNetAmount('');
  };

  return (
    <>
      <form
        aria-label='Form to calculate the gross amount and tax amount'
        className='form'
        onSubmit={submitHandler}>
        <label htmlFor='product-name'>Product Name</label>
        <input
          type='text'
          id='product-name'
          placeholder='Enter a product name'
          onChange={enteredProductHandler}
          value={productName}
          required
        />

        <label htmlFor='net-amount'>Net Amount</label>
        <input
          type='number'
          id='net-amount'
          placeholder='Enter number of the net amount'
          onChange={enteredNetAmountHandler}
          value={netAmount}
          required
        />

        <label htmlFor='vat-rate'>VAT Rate:</label>
        <select id='vat-rate' value={vatRate} onChange={vatRateHandler}>
          <option value='25'>25%</option>
          <option value='23'>23%</option>
          <option value='22'>22%</option>
          <option value='8'>8%</option>
          <option value='7'>7%</option>
          <option value='5'>5%</option>
          <option value='0'>0%</option>
        </select>

        <label htmlFor='currency'>Choose a currency:</label>
        <select id='currency' value={currency} onChange={currencyHandler}>
          <option value='nok'>NOK</option>
          <option value='pln'>PLN</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>

        <button type='submit'>Calculate</button>
      </form>

      <FormResult calculateResult={calculateResult} />
    </>
  );
}

export default Form;
