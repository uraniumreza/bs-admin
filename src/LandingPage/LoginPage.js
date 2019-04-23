import React, { Component } from 'react';
import auth from '../Common/auth';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null
    };
    this.addLoggedInNotification = this.addLoggedInNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.addLoggedInFailedNotification = this.addLoggedInFailedNotification.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    const { phone, password } = this.state;
    const response = await auth.login(phone, password);
    console.log(response.user);
    if (auth.loggedIn()) {
      this.addLoggedInFailedNotification();
      this.props.history.push('/orders');
    } else {
      this.addLoggedInFailedNotification();
    }
  };

  addLoggedInNotification() {
    this.notificationDOMRef.current.addNotification({
      title: 'Success',
      message: 'Logged in!',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  addLoggedInFailedNotification() {
    this.notificationDOMRef.current.addNotification({
      title: 'Failed',
      message: 'Log in Failed!',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  render() {
    return (
      <div className="login-component">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" name="phone" type="text" placeholder="Phone" onChange={this.handleChange} />
          <label className="form-label" for="input-example-1">
            Password
          </label>
          <input
            className="form-input"
            name="password"
            type="password"
            id="input-example-1"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button className="password-button btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
