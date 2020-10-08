import React, { Component } from 'react';
import './App.css';
import Film from './images/film-reel.png'
import Tomatillos from './images/tomatillo.png'
import Movies from './movies/Movies.js'
import Login from "./login/Login.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isLoading: false,
      error: null,
      user: {}
    };
  }

  componentDidMount() {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(response => response.json())
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  setUser = (newUser) => {
    this.setState({user: newUser})
  }

  render() {
    const { movies, isLoading, error } = this.state;

    if (error) {
      return <p>{'Something went wrong...'}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        <header>
          <h1><img className='logo' src={Tomatillos}/>Rancid Tomatillos</h1>
          <img className='flim-reel' src={Film}/>
          <h1> Welcome {this.state.user.name || 'Movie Goer'}!</h1>
          <button>Login</button> <button>Logout</button>
          <Login setUser={this.setUser} />
        </header>
        <section className='all-cards'>
        < Movies movies={this.state.movies} />
        </section>
      </section>
    )
  }
}

export default App;
