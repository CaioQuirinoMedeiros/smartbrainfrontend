import React from "react";
import { base_url } from "../config/baseUrl";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isLoading: false,
      loginFailed: false,
      error: ""
    };
  }

  onEmailChange = event => {
    this.setState({
      signInEmail: event.target.value,
      loginFailed: false,
      error: ""
    });
  };

  onPasswordChange = event => {
    this.setState({
      signInPassword: event.target.value,
      loginFailed: false,
      error: ""
    });
  };

  onSubmitSignIn = e => {
    e.preventDefault();
    if (this.state.signInEmail === "" || this.state.signInPassword === "")
      return;

    this.setState({ isLoading: true, loginFailed: false, error: "" });

    fetch(`${base_url}/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => {
        this.setState({ isLoading: false });
        return response.json();
      })
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
        } else if (user.error) {
          this.setState({ loginFailed: true, error: user.error });
        }
      })
      .catch(error => {
        this.setState({ loginFailed: true, error: 'Login failed' });
      });
  };

  render() {
    const { onRouteChange } = this.props;
    const loadingActive = this.state.isLoading ? "active" : "";
    const errorActive = this.state.loginFailed ? "active" : "";
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmitSignIn} className="form_signin">
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
          <div className="input-signin_wrapper" />
          <div className="input-signin_wrapper">
            <input type="submit" value="Sign in" />
            <div className={`lds-dual-ring ${loadingActive}`} />
            <div className={`error ${errorActive}`}>X</div>
          </div>
          <div className="input-signin_wrapper">
            <span onClick={() => onRouteChange("register")}>Register</span>
          </div>
        </form>
        <h4 className="errorLogin">{this.state.error}</h4>
      </React.Fragment>
    );
  }
}

export default Signin;
