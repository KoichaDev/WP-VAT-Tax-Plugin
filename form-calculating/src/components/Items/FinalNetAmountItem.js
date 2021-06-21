import React, { useContext, forwardRef } from 'react';
import ItemContext from './../../store/item-context';
import Input from '../UI/Input';
import './FinalNetAmountItem.scss';

function FinalNetAmount({}, ref) {
  const { convertedNetAmount } = useContext(ItemContext).item;
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
        value: convertedNetAmount.toString().replace('0', ''),
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
