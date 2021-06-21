import React, { useState, useEffect, useContext } from 'react';
import ItemContext from '../../store/item-context';
import Input from '../UI/Input';

function AddNetAmountItem() {
  const [enteredNetAmount, setEnteredNetAmount] = useState('');

  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    itemCtx.setEnteredNetAmount({ enteredNetAmount });
  }, [enteredNetAmount]);

  const amountFromNetHandler = (e) => setEnteredNetAmount(e.target.value);

  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'Enter Net Amount',
      }}
      input={{
        type: 'number',
        id: 'net-amount',
        value: enteredNetAmount,
        onChange: amountFromNetHandler,
        placeholder: 'Add a number...',
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
