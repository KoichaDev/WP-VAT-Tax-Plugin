import React from 'react';
import Select from '../UI/Select';
import './AddCurrency.scss';

function AddCurrency({ label, select }) {
  return (
    <Select
      label={{ id: label.id, className: label.className }}
      select={{ value: select.value, onChange: select.onChange }}>
      <option value='nok'>NOK</option>
      <option value='pln'>PLN</option>
      <option value='eur'>EUR</option>
      <option value='usd'>USD</option>
    </Select>
  );
}

export default AddCurrency;
