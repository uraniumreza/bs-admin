import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
