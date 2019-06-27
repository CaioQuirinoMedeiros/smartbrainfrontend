import React from "react";
import api from "../config/api";

class Register extends React.Component {
  state = {
    name: "",
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

  onSubmitRegister = async e => {
    e.preventDefault();

    this.setState({ loading: "active", error: "" });

    const { name, email, password } = this.state;
    const { loadUser } = this.props;

    if (!name.lenght || !email.lenght || !password.length) {
      this.setState({ error: "Preencha os campos corretamente" });
    }

    try {
      const response = await api.post("register", { name, email, password });

      loadUser(response.data);
    } catch (err) {
      this.setState({ error: "Erro ao registrar usuário" });
    } finally {
      this.setState({ loading: "" });
    }
  };

  render() {
    const { onRouteChange } = this.props;
    const { name, email, password, error, loading } = this.state;

    const errorActive = !!error ? "active" : "";
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmitRegister} className="form_signin">
          <legend className="form_legend">Criar conta</legend>
          <div className="input-signin_wrapper">
            <label htmlFor="name">Nome</label>
            <input
              value={name}
              onChange={this.onNameChange}
              type="text"
              name="name"
              id="name"
              required
            />
          </div>
          <div className="input-signin_wrapper">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={this.onEmailChange}
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
              onChange={this.onPasswordChange}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          <div className="input-signin_wrapper">
            <input type="submit" value="Cadastrar" />
            <div className={`lds-dual-ring ${loading}`} />
            <div className={`error ${errorActive}`}>X</div>
          </div>
          <div className="input-signin_wrapper">
            <span onClick={() => onRouteChange("signin")}>
              Já tenho uma conta
            </span>
          </div>
        </form>
        <h4 className="errorLogin">{error}</h4>
      </React.Fragment>
    );
  }
}

export default Register;
