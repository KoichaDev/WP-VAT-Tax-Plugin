import React from 'react';

function Input({ label, input }) {
  return (
    <>
      <label htmlFor={input.id} className={label.className}>
        {label.name}
      </label>
      <input {...input} />
    </>
  );
}

export default Input;
