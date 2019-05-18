import React, { Component } from 'react';
import IndividualUserContainer from './IndividualUserContainer';
import api from '../Common/api';
import Loading from '../Common/Loading';
import AddUserContainer from './AddUserContainer';

class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'user', users: [], isLoading: false };
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

  handleOnUserCategoryClick = category => {
    this.setState({
      category: category
    });
    this.loadData(category);
  };

  render() {
    const { users, isLoading, category } = this.state;
    return (
      <div>
        <AddUserContainer />
        <div className="product-showcase-container">
          <strong>USER LIST</strong>
          <div className="product-category-buttons">
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
