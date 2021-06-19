import React from 'react';

function NewNetAmountItem({ inputValue, onChangeInputValue, currencyValue, onChangeCurrency }) {
  return (
    <div style={{ display: 'inline-block' }}>
      <label htmlFor='converted-input-currency' className='form__currency-label' title='Converted Net Amount'>
        New Target Net Amount
      </label>

      <input
        type='number'
        id='converted-input-currency'
        value={inputValue}
        onChange={onChangeInputValue}
        step='0.01'
        readOnly
        required
      />

      <label htmlFor='convert-selected-currency' className='form__currency-label-from' />
      <select
        id='convert-selected-currency'
        className='form__selected-converted-currency'
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

export default NewNetAmountItem;
