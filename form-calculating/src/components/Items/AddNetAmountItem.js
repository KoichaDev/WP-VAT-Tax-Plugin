import React from 'react';
import Input from '../UI/Input';

function AddNetAmountItem({ value, onChange }) {
  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'Current Net Amount',
      }}
      input={{
        type: 'number',
        id: 'net-amount',
        value: value,
        onChange: onChange,
        placeholder: 'Enter net amount...',
        title: 'Your net amount to convert new exchange ',
        'aria-label': 'Net amount',
        'aria-describedby': 'Your product of net amount',
        step: '0.01',
        required: 'required',
      }}
    />
  );
}

export default AddNetAmountItem;
