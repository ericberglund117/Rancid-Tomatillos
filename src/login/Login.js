import React, { Component } from 'react';
import "./Login.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  submitLogin = (event) => {
    event.preventDefault();
    const newLogin = this.state
    this.getUser(newLogin)
  }

  getUser = (login) => {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login",
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(response => response.json())
    .then(data => this.props.setUser(login))
    .catch(error => this.setState({ error }));
  }

  render() {
    const { email, password, error } = this.state;

    if (error) {
      return <p>{'Username or password is incorrect'}</p>;
    }

    return (
      <form>
      <label htmlFor="email">
        Email
      </label>
        <input
          type="text"
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
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={event => this.handleChange(event)}
        />

        <button onClick={event => this.submitLogin(event)}>Submit</button>
      </form>
    )
  }
}

export default Login;
