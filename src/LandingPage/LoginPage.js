import React, { Component } from 'react';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    console.log('it ends with us');
  };

  render() {
    return (
      <div className="login-component">
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" name="phone" type="text" placeholder="Name" onChange={this.handleChange} />
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
