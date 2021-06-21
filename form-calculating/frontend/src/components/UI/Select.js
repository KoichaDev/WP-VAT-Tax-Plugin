import React from 'react';

function Select({ label, select, children }) {
  return (
    <>
      <label htmlFor={label.id} className={label.className} />
      <select {...select}>{children}</select>
    </>
  );
}

export default Select;
