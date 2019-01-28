import React, { Component } from 'react';
import './App.css';

import Header from './components/layout/Header'
import Products from './components/pages/product/Products'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Products />
      </div>
    );
  }
}

export default App;
