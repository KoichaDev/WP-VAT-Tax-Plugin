import React, { useContext, forwardRef } from 'react';
import ItemContext from './../../store/item-context';
import Input from '../UI/Input';
import './FinalNetAmountItem.scss';

function FinalNetAmount({}, ref) {
  const itemCtx = useContext(ItemContext);

  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'Final Net Amount',
      }}
      input={{
        ref: ref,
        type: 'number',
        id: 'converted-input-currency',
        value: itemCtx.item.convertedNetAmount,
        step: '0.01',
        placeholder: 'Will be Converted',
        'aria-label': 'Converted exchange',
        'aria-describedby': 'Target net amount will be converted to new value',
        readOnly: 'readOnly',
      }}
    />
  );
}

export default forwardRef(FinalNetAmount);
