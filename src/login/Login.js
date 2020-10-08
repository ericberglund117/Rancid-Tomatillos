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

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  submitLogin = event => {
    event.preventDefault();
    const newLogin = this.state
  }
  // need user to log in
  // need to include email and name as empty strings
  // email and name will then fill in with the input values
  componentDidMount(login) {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login",
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(response => response.json())
    .catch(error => this.setState({ error }));
  }

  render() {
    const { username, password, error } = this.state;

    if (error) {
      return <p>{'Username or password is incorrect'}</p>;
    }

    return (
      <form>
        <input
          type="text"
          placeholder="Email"
          title="email"
          value={this.state.email}
          onChange={event => this.handleChange(event)}
        />

        <input
          type="text"
          placeholder="Password"
          title="password"
          value={this.state.password}
          onChange={event => this.handleChange(event)}
        />

        <button onClick={event => this.submitLogin(event)}>Submit</button>
      </form>
    )
  }
}

export default Login;
