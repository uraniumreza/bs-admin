import React, { Component } from 'react';
import IndividualUserContainer from './IndividualUserContainer';
import api from '../Common/api';
import Loading from '../Common/Loading';
import AddUserContainer from './AddUserContainer';

class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'user', users: [], isLoading: false, searchTerm: '' };
  }

  componentDidMount() {
    this.loadData(this.state.category);
  }

  loadData = async status => {
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `users/?role=${status}`;
      const response = await api.get(queryString);
      console.log(response);
      this.setState({
        users: response,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  onHandleSearch = async () => {
    this.setState({
      isLoading: true,
      category: 'Searching'
    });
    const { searchTerm } = this.state;
    try {
      const searchQuery = `users?phone=${searchTerm}`;
      const searchResponse = await api.get(searchQuery);
      if (searchResponse) {
        this.setState({
          users: searchResponse
        });
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
      console.log('Error in user search API');
    }
  };

  handleOnUserCategoryClick = category => {
    this.setState({
      category: category
    });
    this.loadData(category);
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
    const { users, isLoading, category } = this.state;
    return (
      <div>
        <AddUserContainer />
        <div
          className="user-category-search-buttons"
          style={{ marginTop: '30px', marginRight: '3%', marginLeft: '3%' }}
        >
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
            {userTypes.map((type, idx) => (
              <button
                key={idx}
                className={category === type.status ? 'btn btn-primary' : 'btn btn-default'}
                onClick={() => this.handleOnUserCategoryClick(type.status)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="product-showcase-container" style={{ marginTop: '0px' }}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="product-showcase">
              {users.map((user, id) => (
                <IndividualUserContainer key={id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserListContainer;

const userTypes = [
  {
    status: 'user',
    label: 'USERS'
  },
  {
    status: 'sales',
    label: 'SALES'
  },
  {
    status: 'admin',
    label: 'ADMIN'
  }
];
