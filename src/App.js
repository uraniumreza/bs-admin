import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './LandingPage/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import OrderContainer from './Order/OrderContainer';
import ProductContainer from './Product/ProductContainer';
import UserListContainer from './User/UserListContainer';
import NotificationContainer from './Notification/NotificationContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={LoginPage} exact />
          <ProtectedRoute path="/orders" component={OrderContainer} />
          <ProtectedRoute path="/users" component={UserListContainer} />
          <ProtectedRoute path="/products" component={ProductContainer} />
          <ProtectedRoute path="/notifications" component={NotificationContainer} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
