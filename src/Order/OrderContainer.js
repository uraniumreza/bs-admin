import React, { Component } from 'react';
import IndividualOrderContainer from './IndividualOrderContainer';
import api from '../Common/api';
import Loading from '../Common/Loading';

/* For users only textual data will be shown */
/* Make 3 part there too*/
/* Pending, Forwarded, Done */
class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'Pending', orders: [], isLoading: false, SRS: [] };
  }

  componentDidMount() {
    this.loadData(this.state.status);
  }

  handleOnUserCategoryClick = status => {
    this.setState({
      status: status
    });
    this.loadData(status);
  };
  loadData = async status => {
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `order/?state=${status}`;
      const response = await api.get(queryString);
      if (response.length > 0) {
        this.setState({
          orders: response
        });
      }
      const SRQueryString = `user/?role=sales`;
      const SRresponse = await api.get(SRQueryString);
      if (response.length > 0) {
        this.setState({
          SRS: SRresponse
        });
      }

      this.setState({
        isLoading: false
      });
    } catch (error) {
      console.log('API error from console');
    }
  };

  render() {
    const { isLoading, orders, SRS } = this.state;
    return (
      <div className="product-showcase-container">
        <strong>ORDER LIST</strong>
        <div className="product-category-buttons">
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('Pending')}>
            PENDING
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('Processing')}>
            PROCESSING
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('Delivered')}>
            DELIVERED
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('Cancelled')}>
            CANCELLED
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-showcase">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((order, id) => (
              <IndividualOrderContainer key={id} id={id} order={order} SRS={SRS} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default OrderContainer;
