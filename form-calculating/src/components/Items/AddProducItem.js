import React from 'react';
import Input from './../UI/Input';
import './AddProductItem.scss';

function AddProductName({ onChange, value }) {
  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'product-name',
      }}
      input={{
        type: 'text',
        id: 'product-name',
        className: 'form__product-input',
        placeholder: 'Enter a product name',
        value: value,
        onChange: onChange,
        required: 'required',
      }}
    />
  );
}

export default AddProductName;
