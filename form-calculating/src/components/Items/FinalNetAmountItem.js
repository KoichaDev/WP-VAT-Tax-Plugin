import React from 'react';
import Input from '../UI/Input';
import './FinalNetAmountItem.scss';

function FinalNetAmount({ value, onChange }) {
  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'Final Net Amount',
      }}
      input={{
        type: 'number',
        id: 'converted-input-currency',
        value: value,
        onChange: onChange,
        step: '0.01',
        placeholder: 'Will be Converted',
        'aria-label': 'Converted exchange',
        'aria-describedby': 'Target net amount will be converted to new value',
        readOnly: 'readOnly',
        required: 'required',
      }}
    />
  );
}

export default FinalNetAmount;
