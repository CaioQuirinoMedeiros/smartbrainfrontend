import React from "react";
import { base_url } from "../config/baseUrl";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      validEmail: false,
      validPassword: false,
      error: ""
    };
  }

  validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validatePassword = pass => {
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexPass.test(String(pass));
  };

  validateRegister = () =>
    !(this.state.validEmail && this.state.validPassword && this.state.name);

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = async event => {
    await this.setState({ email: event.target.value, error: "" });

    this.validateEmail(this.state.email)
      ? this.setState({ validEmail: true })
      : this.setState({ validEmail: false });
  };

  onPasswordChange = async event => {
    await this.setState({ password: event.target.value, error: "" });

    this.validatePassword(this.state.password)
      ? this.setState({ validPassword: true })
      : this.setState({ validPassword: false });
  };

  onSubmitRegister = e => {
    e.preventDefault();
    if (this.validateRegister()) return;

    fetch(`${base_url}/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.onRouteChange("home");
          this.props.loadUser(user);
        } else if (user.error) {
          this.setState({ error: user.error });
        }
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    const { onRouteChange } = this.props;

    const validEmail = !this.state.email
      ? ""
      : this.state.validEmail
      ? "valid"
      : "invalid";

    const validPassword = !this.state.password
      ? ""
      : this.state.validPassword
      ? "valid"
      : "invalid";

    const validRegister = this.validateRegister() ? "blocked" : "";

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmitRegister} className="form_signin">
          <legend className="form_legend">Register</legend>
          <div className="input-signin_wrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={this.onNameChange}
              id="name"
              required
            />
          </div>
          <div className="input-signin_wrapper">
            <label htmlFor="email">Email</label>
            <input
              className={validEmail}
              type="email"
              name="email"
              onChange={this.onEmailChange}
              id="email"
              required
            />
          </div>
          <div className="input-signin_wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={validPassword}
              type="password"
              name="password"
              onChange={this.onPasswordChange}
              id="password"
              required
            />
            <p className="tip">
              minimum eight characters, at least one letter and one number
            </p>
          </div>
          <div className="input-signin_wrapper">
            <input className={validRegister} type="submit" value="Register" />
          </div>
          <div className="input-signin_wrapper">
            <span onClick={() => onRouteChange("signin")}>Sign in</span>
          </div>
        </form>
        <h4 className="errorLogin">{this.state.error}</h4>
      </React.Fragment>
    );
  }
}

export default Register;
