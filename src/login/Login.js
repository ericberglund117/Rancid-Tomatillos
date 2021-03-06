import React, { Component } from 'react';
import { getUser } from '../apiCalls.js'
import "./Login.css"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  };

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  };

  submitLogin = (event) => {
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    }
    this.fetchUser(newLogin)
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({email:'', password:''})
  };

  fetchUser = (login) => {
    getUser(login)
    .then(data => this.props.setUser(data.user))
    .catch(error => this.setState({ error: 'Incorrect username or password' }));
  };

  errorHandling() {
    return !this.state.error ? '' : <p>{this.state.error}</p>
  };

  render() {
    const { email, password } = this.state;
      return (
        <form className="login-form" title="login-form">
        { this.errorHandling() }
        <label htmlFor="email" className="email-label">
          Email
        </label>
          <input
            type="text"
            className="email-input"
            placeholder="Email"
            name="email"
            value={email}
            onChange={event => this.handleChange(event)}
          />
          <label
            htmlFor="password"
            className="password-label"
          >
            Password
          </label>
          <input
            type="password"
            className="password-input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={event => this.handleChange(event)}
          />
          <Link to="/">
            <button
              type="button"
              className="login-submit"
              onClick={event => this.submitLogin(event)}>
              Submit
            </button>
          </Link>
        </form>
      )
  };
};

Login.propTypes = {
  setUser: PropTypes.func,
  userId: PropTypes.number,
};

export default Login;
