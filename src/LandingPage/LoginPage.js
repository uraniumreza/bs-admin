import React, { Component } from 'react';
import auth from '../Common/auth';
import Loading from '../Common/Loading';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null,
      isLoading: false
    };
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
    this.setState({
      isLoading: true
    });
    const response = await auth.login(phone, password);
    const { loggedIn } = response;
    this.setState({
      isLoading: false
    });
    if (loggedIn) {
      this.props.history.push('/orders');
    } else {
      this.addLoggedInFailedNotification();
    }
  };

  addLoggedInFailedNotification() {
    this.notificationDOMRef.current.addNotification({
      title: 'Failed',
      message: 'Log in Failed!',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 1000 },
      dismissable: { click: true }
    });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="login-component">
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            className="form-input"
            name="phone"
            type="text"
            placeholder="Phone"
            onChange={this.handleChange}
            autoComplete="true"
          />
          <label className="form-label">Password</label>
          <input
            className="form-input"
            name="password"
            type="password"
            id="input-example-1"
            placeholder="Password"
            onChange={this.handleChange}
            autoComplete="true"
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
