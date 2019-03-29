import React, { Component } from 'react';
import AddProductContainer from './AddProductContainer';
import ProductListContainer from './ProductListContainer';
class ProductContainer extends Component {
  render() {
    return (
      <div>
        <AddProductContainer />
        <ProductListContainer />
      </div>
    );
  }
}

export default ProductContainer;
