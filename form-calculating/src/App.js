import React, { useState } from 'react';
import Form from './components/AddItem';
import FormResult from './components/Item';

import './App.scss';

function App() {
  const [calculateItem, setCalculateItem] = useState([]);

  const onAddItemHandler = async (item) => {
    setCalculateItem((prevItem) => [...prevItem, item]);

    const { id, productName, netAmount, vatRate, currency } = item;
    try {
      await fetch(
        `http://godt-sagt.local/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&net-amount=${netAmount}&vat-rate=${vatRate}&currency=${currency}`,
        {
          method: 'POST',
          body: JSON.stringify(item),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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
