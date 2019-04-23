import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import auth from './Common/auth';
import { Redirect } from 'react-router-dom';

class Navbar extends Component {
  handleOnClick = () => {
    auth.logout(() => <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />);
  };
  render() {
    return (
      <div className="navbar-component">
        <header className="navbar">
          <section className="navbar-section">
            <NavLink to="/orders" className="navbar-brand mr-2">
              BS Trading
            </NavLink>
            <NavLink to="/products" className="navbar-brand mr-2">
              Products
            </NavLink>
            <NavLink to="/orders" className="navbar-brand mr-2">
              Orders
            </NavLink>
            <NavLink to="/users" className="navbar-brand mr-2">
              Users
            </NavLink>
          </section>
          <section className="navbar-section">
            <a href="..." className="navbar-brand mr-2" onClick={this.handleOnClick}>
              Logout
            </a>
          </section>
        </header>
      </div>
    );
  }
}

export default Navbar;
