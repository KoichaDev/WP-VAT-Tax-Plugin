import React, { useState } from 'react';
import GoodsProvider from './store/GoodsProvider';
import Form from './components/addItem';
import FormResult from './components/item';

import './App.scss';

function App() {
  const [calculateItem, setCalculateItem] = useState([]);

  const onAddItemHandler = (item) => setCalculateItem((prevItem) => [...prevItem, item]);

  let resultContent = '';

  if (calculateItem.length > 0) {
    resultContent = <FormResult calculateItem={calculateItem} />;
  }

  return (
    <GoodsProvider>
      <h1>Calculate Tax and Vat</h1>
      <Form onAddItem={onAddItemHandler} />
      {resultContent}
    </GoodsProvider>
  );
}

export default App;
