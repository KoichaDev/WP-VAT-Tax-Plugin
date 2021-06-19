import React from 'react';

function VatRateItem({ value, onChange }) {
  return (
    <>
      <label htmlFor='vat-rate' className='form__vat-rate-label'>
        VAT Rate:
      </label>
      <select id='form__vat-rate' className='form__vat-rate' value={value} onChange={onChange}>
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
