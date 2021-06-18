import React, { useState, useEffect } from 'react';
import {
  convertToExchangePrice,
  calculateGrossPrice,
  calculateNetPrice,
  calculateTaxAmount,
} from '../calculate-items';
import EqualIcon from './Icons/EqualIcon';
import currencies from '../currencyExchange.json';
import './addItem.scss';

function AddItem() {
  const [productName, setProductName] = useState('');
  const [netAmountFrom, setNetAmountFrom] = useState('');
  const [netAmountTo, setNetAmountTo] = useState('');
  const [totalNetAmount, setTotalNetAmount] = useState('');

  const [selectedFromCurrency, setSelectedFromCurrency] = useState('nok');
  const [selectedToCurrency, setSelectedToCurrency] = useState('pln');
  const [currenciesExchange, setCurrenciesExchange] = useState([]);
  // const [calculateCurrency, setCalculateCurrency] = useState(currencyTo);
  const [vatRate, setVatRate] = useState(25);

  const [grossPrice, setGrossPrice] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  // Looping through to get currencies Exhange from json file
  useEffect(() => {
    for (const currency in currencies) {
      setCurrenciesExchange((prevCurrency) => [
        ...prevCurrency,
        { currency, priceExchange: currencies[currency] },
      ]);
    }
  }, []);

  useEffect(() => {
    currenciesExchange.map((currencyExchange) => {
      const { currency, priceExchange } = currencyExchange;
      if (selectedFromCurrency === currency) {
        // Targeting the currency to exchange from nok to pln for example
        const targetNewCurrency = priceExchange[selectedToCurrency];
        const newValue = convertToExchangePrice(netAmountFrom, targetNewCurrency);

        setNetAmountTo(newValue.toFixed(2));
      }

      // if (selectedToCurrency === currency) {
      //   const targetNewCurrency = priceExchange[selectedFromCurrency];
      //   const newValue = convertToExchangePrice(netAmountFrom, targetNewCurrency);

      //   setNetAmountTo(newValue.toFixed(2));
      // }
    });
  }, [netAmountFrom, selectedFromCurrency, selectedToCurrency]);

  // useEffect(() => {
  //   // const grossPrice = Number(calculateGrossPrice(netAmount, vatRate)).toFixed(2);
  //   // const netPrice = Number(calculateNetPrice(grossPrice, vatRate)).toFixed(2);
  //   // const taxAmountPrice = Number(calculateTaxAmount(netPrice, vatRate)).toFixed(2);
  //   // setGrossPrice(grossPrice);
  //   // setNetPrice(netPrice);
  //   // setTaxAmount(taxAmountPrice);
  // }, [grossPrice, netAmount, netPrice, vatRate]);

  const enteredProductHandler = (e) => setProductName(e.target.value);

  const amountFromNetHandler = (e) => setNetAmountFrom(parseFloat(e.target.value));

  const amountToNetHandler = (e) => {
    setNetAmountTo(parseFloat(e.target.value));
  };

  const vatRateHandler = (e) => setVatRate(e.target.value);

  const currencyFromHandler = (e) => setSelectedFromCurrency(e.target.value);

  const currencyToHandler = (e) => setSelectedToCurrency(e.target.value);

  return (
    <>
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
          value={netAmountFrom}
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
          value={netAmountTo}
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
    </>
  );
}

export default AddItem;
