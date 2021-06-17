import React, { useState } from 'react';
import Form from './components/AddItem';
import FormResult from './components/ShowItem';
import useHttp from './hooks/use-http';
import './App.scss';

function App() {
  const [calculateItem, setCalculateItem] = useState([]);
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const createItem = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const onAddItemHandler = async (item) => {
    const { id, productName, netAmount, vatRate, currency } = item;
    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&net-amount=${netAmount}&vat-rate=${vatRate}&currency=${currency}`;

    setCalculateItem((prevItem) => [...prevItem, item]);

    sendItemRequest(
      {
        url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': nonce,
        },
        credentials: 'same-origin',
        body: item,
      },
      createItem.bind(null, item)
    );
  };

  let resultContent = '';

  if (calculateItem.length > 0) {
    resultContent = <FormResult calculateItem={calculateItem} />;
  }

  if (error) {
    resultContent = <p>{error}</p>;
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
