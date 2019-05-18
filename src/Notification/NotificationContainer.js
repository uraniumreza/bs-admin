import React, { Component } from 'react';
import api from '../Common/api';
import 'react-notifications-component/dist/theme.css';
import AddNotificationContainer from './AddNotificationContainer';
import Loading from '../Common/Loading';
import IndividualNotificationContainer from './IndividualNotificationContainer';

class NotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { notifications: [], isLoading: false };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    this.setState({
      isLoading: false
    });
    try {
      const queryString = `notifications`;
      const response = await api.get(queryString);
      console.log(response);
      this.setState({
        notifications: response
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { notifications, isLoading } = this.state;
    return (
      <div>
        <AddNotificationContainer />
        <div className="product-showcase">
          {isLoading ? (
            <Loading />
          ) : (
            notifications.map((notification, idx) => {
              return <IndividualNotificationContainer notification={notification} key={idx} />;
            })
          )}
        </div>
      </div>
    );
  }
}

export default NotificationContainer;
