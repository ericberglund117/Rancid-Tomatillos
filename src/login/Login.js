import React, { Component } from 'react';
import { getUser } from '../apiCalls.js'
import "./Login.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  submitLogin = (event) => {
    const newLogin = this.state
    console.log(newLogin.password)
    this.fetchUser(newLogin)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({email:'', password:''})
  }

  fetchUser = (login) => {
    getUser(login)
    .then(data => this.props.setUser(data.user))
    .catch(error => this.setState({ error: 'Incorrect username or password' }));
  }

  render() {
    const { email, password, error } = this.state;
      return (
        <form className="login-form" >
        {!error ? '' : <p>{error}</p>}
        <label htmlFor="email">
          Email
        </label>
          <input
            type="text"
            className="email-input"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />
          <label htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={event => this.handleChange(event)}
          />
          <button
            type="button"
            className="login-submit"
            onClick={event => this.submitLogin(event)}>
            Submit
          </button>
        </form>
      )
    //}
  }
}

export default Login;
