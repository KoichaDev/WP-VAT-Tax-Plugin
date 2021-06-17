import React, { useState } from 'react';
import Form from './components/AddItem';
import FormResult from './components/ShowItem';

import './App.scss';

function App() {
  const [calculateItem, setCalculateItem] = useState([]);

  const onAddItemHandler = async (item) => {
    setCalculateItem((prevItem) => [...prevItem, item]);
    const { id, productName, netAmount, vatRate, currency } = item;
    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const postUrl = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&net-amount=${netAmount}&vat-rate=${vatRate}&currency=${currency}`;

    try {
      await fetch(postUrl, {
        method: 'POST',
        'X-WP-Nonce': nonce,
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  let resultContent = '';

  if (calculateItem.length > 0) {
    resultContent = <FormResult calculateItem={calculateItem} />;
  }

  return (
    <>
      <h1>Calculate Tax and Vat</h1>
      <Form onAddItem={onAddItemHandler} />
      {resultContent}
    </>
  );
}

export default App;
