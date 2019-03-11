import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className="login-component">
        <div class="form-group">
          <label class="form-label" for="input-example-1">
            Phone
          </label>
          <input class="form-input" type="text" id="input-example-1" placeholder="Name" />
          <label class="form-label" for="input-example-1">
            Password
          </label>
          <input class="form-input" type="password" id="input-example-1" placeholder="Password" />
          <button class="password-button btn btn-primary">Submit</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
