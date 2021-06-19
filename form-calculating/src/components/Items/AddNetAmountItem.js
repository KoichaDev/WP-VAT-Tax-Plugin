import React from 'react';

function AddNetAmountItem({ inputValue, onChangeInputValue, currencyValue, onChangeCurrency }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <label htmlFor='net-from-amount' className='form__currency-label'>
        Current Net Amount
      </label>

      <input
        type='number'
        id='net-amount'
        value={inputValue}
        onChange={onChangeInputValue}
        step='0.01'
        required
      />

      <label htmlFor='current-selected-currency' className='form__currency-label-from' />
      <select
        id='current-selected-currency'
        className='form__selected-currency'
        value={currencyValue}
        onChange={onChangeCurrency}>
        <option value='nok'>NOK</option>
        <option value='pln'>PLN</option>
        <option value='eur'>EUR</option>
        <option value='usd'>USD</option>
      </select>
    </div>
  );
}

export default AddNetAmountItem;
