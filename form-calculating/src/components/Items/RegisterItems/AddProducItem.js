import React from 'react';
import './AddProductItem.scss';

function AddProductName({ onChange, value }) {
  return (
    <>
      <label htmlFor='product-name' className='form__product-label'>
        Product Name
      </label>

      <input
        type='text'
        id='product-name'
        className='form__product-input'
        placeholder='Enter a product name'
        onChange={onChange}
        value={value}
        required
      />
    </>
  );
}

export default AddProductName;
