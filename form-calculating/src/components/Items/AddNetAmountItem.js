import React from 'react';
import Input from './../UI/Input';

function AddNetAmountItem({ inputValue, onChangeInputValue, currencyValue, onChangeCurrency }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <Input
        label={{
          className: 'form__currency-label',
          name: 'Current Net Amount',
        }}
        input={{
          type: 'number',
          id: 'net-amount',
          value: inputValue,
          onChange: onChangeInputValue,
          step: '0.01',
          required: 'required',
        }}
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
