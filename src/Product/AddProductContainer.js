import React, { Component } from 'react';

class AddProductContainer extends Component {
  render() {
    return (
      <div className="add-product-container">
        Add a product by clicking the button
        <button className="btn btn-primary" onClick={this.handleOnClick}>
          Add a product
        </button>
        Or click on the product to edit the information
      </div>
    );
  }

  handleOnClick = () => {
    console.log('this is us');
  };
}

export default AddProductContainer;
