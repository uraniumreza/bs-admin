import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeContainer from './Home/HomeContainer';
import OrderContainer from './Order/OrderContainer';
import UserContainer from './User/UserContainer';
import ProductContainer from './Product/ProductContainer';
// import LoginPage from './LoginPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/" component={HomeContainer} exact />
          <Route path="/products" component={ProductContainer} />
          <Route path="/orders" component={OrderContainer} />
          <Route path="/users" component={UserContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
