import React, { useContext } from 'react';
import ItemContext from '../../store/item-context';
import Input from '../UI/Input';
import './ConvertedNetAmount.scss';

function ConvertedNetAmount() {
  const { convertedNetAmount } = useContext(ItemContext).item;
  return (
    <Input
      label={{
        className: 'form__currency-label',
        name: 'Final Net Amount',
      }}
      input={{
        type: 'number',
        id: 'converted-input-currency',
        value: convertedNetAmount,
        placeholder: 'Will be Converted',
        'aria-label': 'Converted exchange',
        'aria-describedby': 'Target net amount will be converted to new value',
        readOnly: 'readOnly',
      }}
    />
  );
}

export default ConvertedNetAmount;
