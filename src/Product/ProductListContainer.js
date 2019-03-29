import React, { Component } from 'react';

class ProductListContainer extends Component {
  render() {
    return (
      <div className="product-showcase-container">
        <strong>PRODUCT LIST</strong>
        <div className="product-showcase">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((x, id) => (
            <div key={id} className="individual-product-container">
              <img
                className="individual-product-image"
                src="https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg"
                alt="product"
              />
              <div className="product-name">
                <strong>Price: </strong>৳1,699
              </div>
              <div className="product-name">
                <strong>Name:</strong>Hestia Goods Switch Carrying Case
              </div>
              <div className="product-name">
                <strong>Brand:</strong> XYZ
              </div>
              <div className="product-name">
                <strong>category:</strong> XYZ
              </div>
              <div className="product-name">
                <strong>Stock:</strong> 5
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductListContainer;
