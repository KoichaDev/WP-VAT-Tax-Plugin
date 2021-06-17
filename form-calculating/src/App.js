import React from 'react';
import GoodsProvider from './store/GoodsProvider';
import Form from './components/Form';
import './App.scss';

function App() {
  return (
    <GoodsProvider>
      <h1>Calculate Tax and Vat</h1>
      <Form />
    </GoodsProvider>
  );
}

export default App;
