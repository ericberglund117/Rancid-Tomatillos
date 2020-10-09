import React, { Component } from 'react';
import './App.css';
import Film from './images/film-reel.png';
import Tomatillos from './images/tomatillo.png';
import Movies from './movies/Movies.js';
import Login from "./login/Login.js";
import { Switch, Route, Link } from 'react-router-dom';

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
    console.log('hello')
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(response => response.json())
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  setUser = (newUser) => {
    this.setState({user: newUser})
  }

  submitLogout = (event) => {
    this.setState({user: {}})
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
          <Link to='/'>
          <h1><img className='logo' src={Tomatillos}/>Rancid Tomatillos</h1>
          </Link>
          <h2> Welcome {this.state.user.name || 'Movie Goer'}!</h2>
            <Link to='/signin'>
            <button type="button">Login</button>
            </Link>
          <button
            type="button"
            onClick={event => this.submitLogout(event)}>Logout</button>
          <img className='flim-reel' src={Film}/>
          <Login setUser={this.setUser} />
        </header>
        <Switch>
          <Route path='/' render={() => <Movies movies={this.state.movies} /> } />
          <Route exact path='/signin' render={() => <Login setUser={this.setUser} /> } />
          // <Route path='/logout' render={() => <App />} />
        </Switch>
        // <section className='all-cards'>
        //   <Movies movies={this.state.movies} />
        // </section>
      </section>
    )
  }
}

export default App;
