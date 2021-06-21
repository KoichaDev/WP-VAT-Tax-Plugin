import React, { useState, useEffect, useContext } from 'react';
import ItemContext from '../../store/item-context';

import './VatRateItem.scss';

function VatRateItem() {
  const [vatRate, setVatRate] = useState(25);

  const itemCtx = useContext(ItemContext);

  useEffect(() => {
    itemCtx.selectVatRate({ vatRate });
  }, [vatRate]);

  const vatRateHandler = (e) => setVatRate(e.target.value);

  return (
    <>
      <label htmlFor='vat-rate' className='form__vat-rate-label'>
        VAT Rate:
      </label>
      <select id='form__vat-rate' className='form__vat-rate' value={vatRate} onChange={vatRateHandler}>
        <option value='25'>25%</option>
        <option value='23'>23%</option>
        <option value='22'>22%</option>
        <option value='8'>8%</option>
        <option value='7'>7%</option>
        <option value='5'>5%</option>
        <option value='0'>0%</option>
      </select>
    </>
  );
}

export default VatRateItem;
