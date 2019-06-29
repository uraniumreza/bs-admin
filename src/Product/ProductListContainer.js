import React, { Component } from 'react';
import IndividualProductContainer from './IndividualProductContainer';
import api from '../Common/api';
import Loading from '../Common/Loading';

class ProductListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'Cosmetics', items: [], isLoading: false };
  }

  componentDidMount() {
    this.loadData(this.state.category);
  }

  handleOnCategoryClick = category => {
    this.setState({
      category: category,
      isLoading: false
    });
    this.loadData(category);
  };

  loadData = async category => {
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `products/?category=${category}`;
      const response = await api.get(queryString);
      console.log(response);
      if (response.length > 0) {
        this.setState({
          items: response,
          isLoading: false
        });
      }
    } catch (error) {
      console.log('API error from console');
    }
  };

  render() {
    const { items, isLoading, category } = this.state;
    return (
      <div className="product-showcase-container">
        <strong>PRODUCT LIST</strong>
        <div className="product-category-buttons">
          {buttonTags.map((button, id) => (
            <button
              key={id}
              className={category === button.status ? 'btn btn-primary' : 'btn btn-default'}
              onClick={() => this.handleOnCategoryClick(button.status)}
            >
              {button.status}
            </button>
          ))}
          <button className="btn btn-default" onClick={() => this.handleOnCategoryClick(category)}>
            Refresh
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-showcase">
            {items.map((item, id) => (
              <IndividualProductContainer key={id} item={item} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ProductListContainer;

const buttonTags = [
  {
    status: 'Cosmetics'
  },
  {
    status: 'Electronics'
  },
  {
    status: 'Accessories'
  }
];
