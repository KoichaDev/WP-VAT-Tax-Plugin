import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  convertToExchangePrice,
  calculateGrossPrice,
  calculateNetPrice,
  calculateTaxAmount,
} from '../calculate-items';
import SortIcon from '../Icons/SortIcon';
import currencies from '../currencyExchange.json';
import './addItem.scss';

function AddItem({ onAddItem }) {
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

        // console.log(priceExchange, selectedFromCurrency);
        // console.log(currency, priceExchange.selectedFromCurrency);
        // if (currency) {
        //   console.log(priceExchange.currency);
        // }
        // convertToExchangePrice(netAmountFrom,  ,currency);
      }
    });
  }, [currenciesExchange, netAmountFrom, netAmountTo, selectedToCurrency]);

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

  const amountToNetHandler = (e) => setNetAmountTo(parseFloat(e.target.value));

  const vatRateHandler = (e) => setVatRate(e.target.value);

  const currencyFromHandler = (e) => setSelectedFromCurrency(e.target.value);

  const currencyToHandler = (e) => setSelectedToCurrency(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    // Lifting up the state
    onAddItem({
      id: uuidv4(),
      productName,
      // netAmount,
      grossPrice,
      netPrice,
      taxAmount,
      // currency,
      vatRate,
    });

    // Reset input field to empty string after submitting the form
    setProductName('');
    // setNetAmount('');
  };

  return (
    <>
      <form
        aria-label='Form to calculate the gross amount and tax amount'
        className='form'
        onSubmit={submitHandler}>
        <label htmlFor='product-name' className='form__product-label-from'>
          Product Name
        </label>
        <input
          type='text'
          id='product-name-from'
          className='form__product-input-from'
          placeholder='Enter a product name'
          onChange={enteredProductHandler}
          value={productName}
          required
        />
        <p>Net Amount</p>

        <label htmlFor='net-from-amount' className='form__currency-to'></label>
        <input
          type='number'
          id='net-from-amount'
          onChange={amountFromNetHandler}
          value={netAmountFrom}
          step='0.01'
          required
        />

        <label htmlFor='currency-from' className='form__currency-label-from' />
        <select
          id='currency-from'
          className='form__currency-select-from'
          value={selectedFromCurrency}
          onChange={currencyFromHandler}>
          <option value='nok'>NOK</option>
          <option value='pln'>PLN</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>

        <label htmlFor='net-amount' className='form__currency-input-from' />

        <SortIcon className='form__sort-icon' />

        <input
          type='number'
          id='net-amount'
          placeholder=''
          value={netAmountTo}
          onChange={amountToNetHandler}
          step='0.01'
          required
        />

        <label htmlFor='currency-to' className='form__currency-label-to' />
        <select
          id='currency-to'
          className='form__currency-input-to'
          value={selectedToCurrency}
          onChange={currencyToHandler}>
          <option value='nok'>NOK</option>
          <option value='pln'>PLN</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>

        <label htmlFor='vat-rate' className='form__vat-rate-label'>
          VAT Rate:
        </label>
        <select
          id='form__vat-rate'
          className='form__vat-rate'
          value={vatRate}
          onChange={vatRateHandler}>
          <option value='25'>25%</option>
          <option value='23'>23%</option>
          <option value='22'>22%</option>
          <option value='8'>8%</option>
          <option value='7'>7%</option>
          <option value='5'>5%</option>
          <option value='0'>0%</option>
        </select>

        <button type='submit'>Calculate</button>
      </form>
    </>
  );
}

export default AddItem;
