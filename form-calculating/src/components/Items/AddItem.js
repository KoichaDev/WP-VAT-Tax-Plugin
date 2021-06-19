import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { convertExchangePrice } from '../../calculate-items';
import EqualIcon from '../Icons/EqualIcon';
import AddProductName from './AddProducItem';
import AddNetAmountItem from './AddNetAmountItem';
import NewNetAmountItem from './NewNetAmountItem';
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
      <AddProductName onChange={enteredProductHandler} value={productName} />

      <AddNetAmountItem
        inputValue={enterNetAmount}
        onChangeInputValue={amountFromNetHandler}
        currencyValue={selectedFromCurrency}
        onChangeCurrency={currencyFromHandler}
      />

      <EqualIcon
        className='form__sort-icon'
        title='Switch currency'
        ariaLabel='Currency Converted to'
        title='Currency Converted to'
      />

      <NewNetAmountItem
        inputValue={finalNetAmount}
        onChangeInputValue={amountToNetHandler}
        currencyValue={selectedToCurrency}
        onChangeCurrency={currencyToHandler}
      />
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
