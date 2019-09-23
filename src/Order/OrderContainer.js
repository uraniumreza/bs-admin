import React, { Component } from 'react';
import IndividualOrderContainer from './IndividualOrderContainer';
import api from '../Common/api';
import Loading from '../Common/Loading';
import { bold } from 'ansi-colors';

class OrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { status: 'Pending', orders: [], isLoading: false, SRS: [], searchTerm: '' };
  }

  componentDidMount() {
    this.loadData(this.state.status);
    this.loadSRData();
  }

  loadSRData = async () => {
    try {
      const SRQueryString = `users/?role=sales`;
      const SRresponse = await api.get(SRQueryString);
      if (SRresponse.length >= 0) {
        this.setState({
          SRS: SRresponse
        });
      }
    } catch (error) {
      console.log('API error for getting SR');
    }
  };

  onHandleSearch = async () => {
    this.setState({
      isLoading: true,
      status: 'Searching'
    });
    const { searchTerm } = this.state;
    try {
      const searchQuery = `orders?order_id=${searchTerm}`;
      const searchResponse = await api.get(searchQuery);
      if (searchResponse) {
        this.setState({
          orders: searchResponse
        });
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
      console.log('Error in search API');
    }
  };

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
      const queryString = `orders/?state=${status}`;
      const response = await api.get(queryString);
      if (response.length >= 0) {
        this.setState({
          orders: response
        });
      }
      this.setState({
        isLoading: false
      });
    } catch (error) {
      console.log('API error for getting orders.');
    }
  };

  updateSearchTerm = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.onHandleSearch();
    }
  };

  render() {
    const { isLoading, orders, SRS, status } = this.state;
    return (
      <div className="order-showcase-container">
        <div className="order-category-search-buttons">
          <div className="order-category-search">
            <div className="input-group input-inline">
              <input
                className="form-input"
                type="text"
                placeholder="search"
                name="searchTerm"
                onChange={e => this.updateSearchTerm(e)}
                onKeyDown={e => this.handleKeyDown(e)}
              />
              <button className="btn btn-primary input-group-btn" onClick={e => this.onHandleSearch(e)}>
                Search
              </button>
            </div>
          </div>
          <div className="order-category-buttons">
            {buttonTags.map((button, id) => (
              <button
                key={id}
                className={status === button.status ? 'btn btn-primary' : 'btn btn-default'}
                onClick={() => this.handleOnUserCategoryClick(button.status)}
              >
                {button.status}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-showcase-container">
            <div className="user-number-showcase">
              {status} : {orders ? orders.length : 0}
            </div>
            <div className="product-showcase">
              {orders.length > 0 ? (
                orders.map((order, id) => <IndividualOrderContainer key={id} order={order} SRS={SRS} />)
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    fontWeight: bold,
                    width: '100%'
                  }}
                >
                  <h1>কোন অর্ডার নেই</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OrderContainer;

const buttonTags = [
  {
    status: 'Pending'
  },
  {
    status: 'Processing'
  },
  {
    status: 'Delivered'
  },
  {
    status: 'Cancelled'
  }
];
