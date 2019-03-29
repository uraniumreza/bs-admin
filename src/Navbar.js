import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-component">
        <header className="navbar">
          <section className="navbar-section">
            <NavLink to="/" className="navbar-brand mr-2">
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
            <a href="..." className="navbar-brand mr-2">
              Logout
            </a>
          </section>
        </header>
      </div>
    );
  }
}

export default Navbar;
