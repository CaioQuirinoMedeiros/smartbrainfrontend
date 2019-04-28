import React from "react";
import { backendUrl } from "../App";

class Signin extends React.Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    if (!(Object.values(this.state).indexOf("") === -1)) return;
    fetch(`${backendUrl}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="form_signin">
        <legend className="form_legend">Sign In</legend>
        <div className="input-signin_wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={this.onEmailChange}
            type="email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="input-signin_wrapper">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.onPasswordChange}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div className="input-signin_wrapper">
          <label className="remember_label">
            <input type="checkbox" name="remember" /> Remember-me
          </label>
        </div>
        <div className="input-signin_wrapper">
          <input onClick={this.onSubmitSignIn} type="submit" value="Sign in" />
        </div>
        <div className="input-signin_wrapper">
          <span onClick={() => onRouteChange("register")}>Register</span>
        </div>
      </div>
    );
  }
}

export default Signin;
