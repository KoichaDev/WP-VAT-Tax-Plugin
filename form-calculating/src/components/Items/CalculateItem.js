import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  convertExchangePrice,
  calculateGrossPrice,
  calculateNetPrice,
  calculateTaxAmount,
} from '../../calculate-items';
import ItemContext from './../../store/item-context';
import AddProductName from './AddProducItem';
import AddNetAmountItem from './AddNetAmountItem';
import AddCurrency from './AddCurrency';
import currencies from '../../currencyExchange.json';
import EqualIcon from '../Icons/EqualIcon';
import FinalNetAmount from './FinalNetAmountItem';
import Form from '../UI/Form';
import VatRateItem from './VatRateItem';
import './CalculateItem.scss';

function AddItem({ onAddItem, isVisible, setIsVisible, onClick }) {
  const [selectedFromCurrency, setSelectedFromCurrency] = useState('nok');
  const [selectedToCurrency, setSelectedToCurrency] = useState('pln');
  const [currenciesExchange, setCurrenciesExchange] = useState([]);

  const itemCtx = useContext(ItemContext);

  const { enteredNetAmount, convertedNetAmount, vatRate } = itemCtx.item;

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
        const newTargetValue = convertExchangePrice(enteredNetAmount, targetNewCurrency);
        itemCtx.setConvertedNetAmount({ newTargetValue });
      }
    });
  }, [enteredNetAmount, selectedFromCurrency, selectedToCurrency]);

  // Reset input field to empty string after submitting the form
  useEffect(() => {
    if (!isVisible) {
      // setProductName('');
      // setEnterNetAmount('');
      // setFinalNetAmount('');
    }
  }, [isVisible]);

  const currencyFromHandler = (e) => setSelectedFromCurrency(e.target.value);

  const currencyToHandler = (e) => setSelectedToCurrency(e.target.value);

  const submitHandler = (e) => {
    e.preventDefault();

    itemCtx.setId({ id: uuidv4() });
    itemCtx.setCurrency({ selectedToCurrency });

    const targetGrossPrice = calculateGrossPrice(convertedNetAmount, vatRate);
    const targetTaxAmountPrice = calculateTaxAmount(targetGrossPrice, vatRate);
    const targetNetProductPrice = calculateNetPrice(targetGrossPrice, targetTaxAmountPrice);

    itemCtx.setGrossPrice({ targetGrossPrice });
    itemCtx.setTaxAmountPrice({ targetTaxAmountPrice });
    itemCtx.setNetProductPrice({ targetNetProductPrice });
  };

  return (
    <Form
      form={{
        'aria-label': 'Form to calculate the gross amount and tax amount',
        className: 'form',
        onSubmit: submitHandler,
      }}>
      <AddProductName />

      {/* Section for adding source target of Net amount  */}
      <div style={{ display: 'inline-block' }}>
        <AddNetAmountItem />

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
        <FinalNetAmount />

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

      <VatRateItem />

      <button
        type='submit'
        className='btn'
        aria-label='Calculate the registered item'
        aria-describedby='Open a new window to display the calculated information before registering the item'
        aria-modal='true'
        title='Calculate the registered item'
        onClick={onClick}>
        Calculate
      </button>
    </Form>
  );
}

export default AddItem;
