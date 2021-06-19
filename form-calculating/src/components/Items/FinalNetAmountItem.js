import React from 'react';
import Input from './../UI/Input';

function FinalNetAmount({ value, onChange }) {
  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'New Target Net Amount',
      }}
      input={{
        type: 'number',
        id: 'converted-input-currency',
        value: value,
        onChange: onChange,
        step: '0.01',
        readOnly: 'readOnly',
        required: 'required',
      }}
    />
  );
}

export default FinalNetAmount;
