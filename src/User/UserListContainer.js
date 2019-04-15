import React, { Component } from 'react';
import IndividualUserContainer from './IndividualUserContainer';

/* For users only textual data will be shown */
/* Make 3 part there too*/
/* Admin, SR, normal user */
class UserListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'user' };
  }

  handleOnUserCategoryClick = category => {
    this.setState({
      category: category
    });
  };

  render() {
    return (
      <div className="product-showcase-container">
        <strong>USER LIST</strong>
        <div className="product-category-buttons">
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('user')}>
            Users
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('sr')}>
            Sales Respresentative
          </button>
          <button className="btn btn-primary" onClick={() => this.handleOnUserCategoryClick('admin')}>
            Admin
          </button>
        </div>
        <div className="product-showcase">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((x, id) => (
            <IndividualUserContainer key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

export default UserListContainer;
