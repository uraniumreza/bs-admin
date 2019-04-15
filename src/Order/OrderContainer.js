import React, { Component } from 'react';
import IndividualOrderContainer from './IndividualOrderContainer';

/* For users only textual data will be shown */
/* Make 3 part there too*/
/* Pending, Forwarded, Done */
class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'pending' };
  }

  handleOnUserCategoryClick = category => {
    this.setState({
      category: category
    });
  };

  render() {
    return (
      <div className="product-showcase-container">
        <strong>ORDER LIST</strong>
        <div className="product-category-buttons">
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('pending')}>
            PENDING
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('forwarded')}>
            FORWARDED
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('done')}>
            DONE
          </button>
        </div>
        <div className="product-showcase">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((x, id) => (
            <IndividualOrderContainer key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

export default OrderContainer;
