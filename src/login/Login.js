import React, { Component } from 'react';
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
    this.getUser(newLogin)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({email:'', password:''})
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
    .then(response => {
      if (response.ok) {
        this.setState({error: ''})
        return response.json()
      }})
    .then(data => this.props.setUser(data.user))
    .catch(error => this.setState({ error: 'Incorrect username or password' }));
  }

  render() {
    const { email, password, error } = this.state;
      return (
        <form>
        {!error ? '' : <p>{error}</p>}
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

          <button type="button" onClick={event => this.submitLogin(event)}>Submit</button>
        </form>
      )
    //}
  }
}

export default Login;
