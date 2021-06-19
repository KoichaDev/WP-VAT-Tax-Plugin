import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { convertExchangePrice } from '../../calculate-items';
import EqualIcon from '../Icons/EqualIcon';
import currencies from '../../currencyExchange.json';
import './addItem.scss';

function AddItem({ onAddItem, onClick }) {
  const [productName, setProductName] = useState('');
  const [enterNetAmount, setEnterNetAmount] = useState('');
  const [finalNetAmount, setFinalNetAmount] = useState('');

  const [selectedFromCurrency, setSelectedFromCurrency] = useState('nok');
  const [selectedToCurrency, setSelectedToCurrency] = useState('pln');
  const [currenciesExchange, setCurrenciesExchange] = useState([]);

  const [vatRate, setVatRate] = useState(25);

  // Looping through to get currencies Exhange from json file
  useEffect(() => {
    for (const currency in currencies) {
      setCurrenciesExchange((prevCurrency) => [
        ...prevCurrency,
        { currency, priceExchange: currencies[currency] },
      ]);
    }
  }, []);

  // useEffect for handling source target to newly converted currency Exchange
  useEffect(() => {
    currenciesExchange.map((currencyExchange) => {
      const { currency, priceExchange } = currencyExchange;
      if (selectedFromCurrency === currency) {
        // Targeting the currency to exchange from nok to pln for example
        const targetNewCurrency = priceExchange[selectedToCurrency];
        const newTargetValue = convertExchangePrice(enterNetAmount, targetNewCurrency);

        setFinalNetAmount(newTargetValue);
      }
    });
  }, [enterNetAmount, selectedFromCurrency, selectedToCurrency]);

  const enteredProductHandler = (e) => setProductName(e.target.value);

  const amountFromNetHandler = (e) => setEnterNetAmount(parseFloat(e.target.value));

  const amountToNetHandler = (e) => setFinalNetAmount(parseFloat(e.target.value));

  const vatRateHandler = (e) => setVatRate(e.target.value);

  const currencyFromHandler = (e) => setSelectedFromCurrency(e.target.value);

  const currencyToHandler = (e) => setSelectedToCurrency(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    // Lifting up the state
    onAddItem({
      id: uuidv4(),
      productName,
      finalNetAmount,
      selectedToCurrency,
      vatRate,
    });

    // Reset input field to empty string after submitting the form
    setProductName('');
    setEnterNetAmount(0.0);
    setFinalNetAmount(0.0);
  };

  return (
    <form
      aria-label='Form to calculate the gross amount and tax amount'
      className='form'
      onSubmit={submitHandler}>
      <label htmlFor='product-name' className='form__product-label'>
        Product Name
      </label>

      <input
        type='text'
        id='product-name'
        className='form__product-input'
        placeholder='Enter a product name'
        onChange={enteredProductHandler}
        value={productName}
        required
      />

      <div style={{ display: 'inline-block' }}>
        <label htmlFor='net-from-amount' className='form__currency-label'>
          Current Net Amount
        </label>
        <input
          type='number'
          id='net-amount'
          value={enterNetAmount}
          onChange={amountFromNetHandler}
          step='0.01'
          required
        />

        <label htmlFor='current-selected-currency' className='form__currency-label-from' />
        <select
          id='current-selected-currency'
          className='form__selected-currency'
          value={selectedFromCurrency}
          onChange={currencyFromHandler}>
          <option value='nok'>NOK</option>
          <option value='pln'>PLN</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>
      </div>

      <EqualIcon
        className='form__sort-icon'
        title='Switch currency'
        ariaLabel='Currency Converted to'
        title='Currency Converted to'
      />

      <div style={{ display: 'inline-block' }}>
        <label
          htmlFor='converted-input-currency'
          className='form__currency-label'
          title='Converted Net Amount'>
          New Target Net Amount
        </label>

        <input
          type='number'
          id='converted-input-currency'
          value={finalNetAmount}
          onChange={amountToNetHandler}
          step='0.01'
          readOnly
          required
        />

        <label htmlFor='convert-selected-currency' className='form__currency-label-from' />
        <select
          id='convert-selected-currency'
          className='form__selected-converted-currency'
          value={selectedToCurrency}
          onChange={currencyToHandler}>
          <option value='nok'>NOK</option>
          <option value='pln'>PLN</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>
      </div>

      <label htmlFor='vat-rate' className='form__vat-rate-label'>
        VAT Rate:
      </label>
      <select id='form__vat-rate' className='form__vat-rate' value={vatRate} onChange={vatRateHandler}>
        <option value='25'>25%</option>
        <option value='23'>23%</option>
        <option value='22'>22%</option>
        <option value='8'>8%</option>
        <option value='7'>7%</option>
        <option value='5'>5%</option>
        <option value='0'>0%</option>
      </select>
      <button
        type='submit'
        aria-label='Calculate the registered item'
        aria-describedby='Open a new window to display the calculated item before registering the item'
        aria-modal='true'
        title='Calculate the registered item'
        onClick={onClick}>
        Calculate
      </button>
    </form>
  );
}

export default AddItem;
