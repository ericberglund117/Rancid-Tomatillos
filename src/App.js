import React, { Component } from 'react';
import './App.css';
import Film from './images/film-reel.png';
import Tomatillos from './images/tomatillo.png';
import Movies  from './movies/Movies.js';
import Login from './login/Login.js';
import SingleMovie  from './single-movie/SingleMovie.js'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: null,
      user: {},
    };
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
          </header>
              <Route exact path='/' render={ () => <Movies /> } />
              <Route exact path='/signin' render={() => <Login setUser={this.setUser} /> } />
              <Route
                path="/movies/:movie_id"
                exact
                render={({ match }) => {
                  const { movie_id } = match.params;
                  return <SingleMovie movieID={movie_id} />
                }}
              />
      </section>
    )
  }
}

export default App;
