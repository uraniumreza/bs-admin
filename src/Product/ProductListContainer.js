import React, { Component } from 'react';
import IndividualProductContainer from './IndividualProductContainer';

class ProductListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'cosmetics' };
  }

  handleOnCategoryClick = category => {
    this.setState({
      category: category
    });
    console.log('category change', category);
  };

  render() {
    return (
      <div className="product-showcase-container">
        <strong>PRODUCT LIST</strong>
        <div className="product-category-buttons">
          <button className="btn btn-primary" onClick={() => this.handleOnCategoryClick('cosmetics')}>
            Cosmetics
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnCategoryClick('electronics')}>
            Electronics
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnCategoryClick('accessories')}>
            Accessories
          </button>
        </div>
        <div className="product-showcase">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((x, id) => (
            <IndividualProductContainer key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductListContainer;
