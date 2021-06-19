import React from 'react';

function Form({ children, form }) {
  return <form {...form}>{children}</form>;
}

export default Form;
