import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { convertExchangePrice } from './../../../calculate-items';
import EqualIcon from '../../Icons/EqualIcon';
import AddProductName from './AddProducItem';
import AddNetAmountItem from './AddNetAmountItem';
import AddCurrency from './AddCurrency';
import FinalNetAmount from './FinalNetAmountItem';
import VatRateItem from './VatRateItem';
import currencies from '../../../currencyExchange.json';
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

      {/* Section for adding source target of Net amount  */}
      <div style={{ display: 'inline-block' }}>
        <AddNetAmountItem value={enterNetAmount} onChange={amountFromNetHandler} />

        <AddCurrency
          label={{
            id: 'current-selected-currency',
            className: 'form__currency-label-from',
          }}
          select={{
            value: selectedFromCurrency,
            onChange: currencyFromHandler,
          }}
        />
      </div>

      <EqualIcon
        className='form__sort-icon'
        title='Switch currency'
        ariaLabel='Currency Converted to'
        title='Currency Converted to'
      />

      {/* Section for converting exchange from the source target of source Net amount  */}

      <div style={{ display: 'inline-block' }}>
        <FinalNetAmount value={finalNetAmount} onChange={amountToNetHandler} />

        <AddCurrency
          label={{
            id: 'convert-selected-currency',
            className: 'form__currency-label-from',
          }}
          select={{
            value: selectedToCurrency,
            onChange: currencyToHandler,
          }}
        />
      </div>

      <VatRateItem value={vatRate} onChange={vatRateHandler} />

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
