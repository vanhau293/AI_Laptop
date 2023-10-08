import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Component/Main';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
