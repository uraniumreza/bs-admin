import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-component">
        <header class="navbar">
          <section class="navbar-section">
            <a href="..." class="navbar-brand mr-2">
              BS Trading
            </a>
            <a href="..." class="btn btn-link">
              Products
            </a>
            <a href="..." class="btn btn-link">
              Users
            </a>
            <a href="..." class="btn btn-link">
              Orders
            </a>
          </section>
        </header>
      </div>
    );
  }
}

export default Navbar;
