import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onNameChange = event => {
        this.setState({ name: event.target.value });
    }
    onEmailChange = event => {
        this.setState({ email: event.target.value });
    }
    onPasswordChange = event => {
        this.setState({ password: event.target.value })
    }

    onSubmitRegister = () => {
        if (!(Object.values(this.state).indexOf('') === -1)) return
        fetch('https://evening-coast-16509.herokuapp.com/register',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                }
            )
        })
            .then(response => response.json())
            .then(user => {
                this.props.loadUser(user);
                if (user.id) this.props.onRouteChange('home');
            })        
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="form_signin">
                <legend className="form_legend">Register</legend>
                <div className="input-signin_wrapper">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={this.onNameChange}
                        id="name"
                        required />
                </div>
                <div className="input-signin_wrapper">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={this.onEmailChange}
                        id="email"
                        required />
                </div>
                <div className="input-signin_wrapper">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        onChange={this.onPasswordChange}
                        id="password"
                        required />
                </div>
                <div className="input-signin_wrapper">
                    <input onClick={this.onSubmitRegister} type="submit" value="Register" />
                </div>
                <div className="input-signin_wrapper">
                    <span onClick={() => onRouteChange('signin')}>Sign-in</span>
                </div>
            </div>
        )
    }
}

export default Register;