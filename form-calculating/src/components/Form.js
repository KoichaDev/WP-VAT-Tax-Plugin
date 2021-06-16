import React from 'react';
import './Form.scss';

function Form() {
  return (
    <form aria-label='Form to calculate the gross amount and tax amount' className='form'>
      <label htmlFor='product-name'>Product Name</label>
      <input type='text' id='product-name' placeholder='Enter a product name' required />

      <label htmlFor='net-amount'>Net Amount</label>
      <input type='number' id='net-amount' placeholder='Enter number of the net amount' required />

      <label htmlFor='vat-rate'>VAT Rate:</label>
      <select id='currenct'>
        <option value='25'>25%</option>
        <option value='23'>23%</option>
        <option value='22'>22%</option>
        <option value='8'>8%</option>
        <option value='7'>7%</option>
        <option value='5'>5%</option>
        <option value='0'>0%</option>
      </select>

      <label htmlFor='currency'>Choose a currency:</label>
      <select id='currenct'>
        <option value='nok'>NOK</option>
        <option value='pln'>PLN</option>
        <option value='eur'>EUR</option>
        <option value='usd'>USD</option>
      </select>

      <button type='submit'>Calculate</button>
    </form>
  );
}

export default Form;
