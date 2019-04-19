import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LandingPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import OrderContainer from './Order/OrderContainer';
import ProductContainer from './Product/ProductContainer';
import UserListContainer from './User/UserListContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={LoginPage} exact />
          <ProtectedRoute path="/orders" component={OrderContainer} />
          <ProtectedRoute path="/users" component={UserListContainer} />
          <ProtectedRoute path="/products" component={ProductContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
