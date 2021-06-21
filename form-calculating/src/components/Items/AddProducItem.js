import React, { useState, useEffect, useContext } from 'react';
import ItemContext from './../../store/item-context';
import Input from './../UI/Input';
import './AddProductItem.scss';

function AddProductName() {
  const [enteredProductName, setEnteredProductName] = useState('');
  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    itemCtx.setEnteredProductName({ enteredProductName });
  }, [enteredProductName]);

  const enteredProductHandler = (e) => setEnteredProductName(e.target.value);

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
        value: enteredProductName,
        onChange: enteredProductHandler,
        required: 'required',
      }}
    />
  );
}

export default AddProductName;
