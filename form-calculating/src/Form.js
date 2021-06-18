import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddItem from './components/AddItem';
import RegisteredItem from './components/RegisteredItem';
import useHttp from './hooks/use-http';
import './Form.scss';

function Form() {
  const [calculateItem, setCalculateItem] = useState([]);
  const { isLoading, error, sendRequest: sendItemRequest } = useHttp();

  const createItem = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const onAddItemHandler = async (item) => {
    const { id, productName, netAmount, grossPrice, netPrice, taxAmount, currency, vatRate } = item;
    const baseUrl = gsReactScript.url;
    const nonce = gsReactScript.nonce;
    const url = `${baseUrl}/wp-json/cpt/v1/post-form-calculation?id=${id}&product-name=${productName}&gross-price=${grossPrice}&net-price=${netPrice}&tax-amount=${taxAmount}%25&net-amount=${netAmount}&vat-rate=${vatRate}%25&currency=${currency}`;

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

  if (error) {
    resultContent = <p>{error}</p>;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    // Lifting up the state
    // onAddItem({
    //   id: uuidv4(),
    //   productName,
    //   // netAmount,
    //   grossPrice,
    //   netPrice,
    //   taxAmount,
    //   // currency,
    //   vatRate,
    // });

    // Reset input field to empty string after submitting the form
    setProductName('');
    // setNetAmount('');
  };

  return (
    <>
      <h1>Calculate Tax and Vat</h1>
      <form
        aria-label='Form to calculate the gross amount and tax amount'
        className='form'
        onSubmit={submitHandler}>
        <AddItem />
        <button type='submit' aria-label='Calculate the item'>
          Calculate
        </button>
      </form>
      {RegisteredItem}
    </>
  );
}

export default Form;
