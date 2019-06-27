import React from "react";
import api from "../config/api";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    loading: "",
    error: ""
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: ""
    });
  };

  onSubmitSignIn = async e => {
    e.preventDefault();

    this.setState({ loading: "active", error: "" });

    const { email, password } = this.state;
    const { loadUser } = this.props;

    if (!email.length || !password.length) {
      this.setState({ error: "Preencha seu e-mail e senha" });
      return;
    }

    try {
      const response = await api.post("signin", { email, password });

      loadUser(response.data);
    } catch (err) {
      this.setState({ error: "Credenciais inválidas" });
    } finally {
      this.setState({ loading: "" });
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { email, password, error, loading } = this.state;

    const errorActive = !!error ? "active" : "";
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmitSignIn} className="form_signin">
          <legend className="form_legend">Entrar</legend>
          <div className="input-signin_wrapper">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={this.onInputChange}
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="input-signin_wrapper">
            <label htmlFor="password">Senha</label>
            <input
              value={password}
              onChange={this.onInputChange}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <div className="input-signin_wrapper" />
          <div className="input-signin_wrapper">
            <input type="submit" value="Login" />
            <div className={`lds-dual-ring ${loading}`} />
            <div className={`error ${errorActive}`}>X</div>
          </div>
          <div className="input-signin_wrapper">
            <span onClick={() => onRouteChange("register")}>Criar conta</span>
          </div>
        </form>
        <h4 className="errorLogin">{error}</h4>
      </React.Fragment>
    );
  }
}

export default Signin;
