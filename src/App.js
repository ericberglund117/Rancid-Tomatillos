import React, { Component } from 'react';
import './App.css';
import Film from './images/film-reel.png';
import Tomatillos from './images/tomatillo.png';
import Movies  from './movies/Movies.js';
import Login from './login/Login.js';
import SingleMovie  from './single-movie/SingleMovie.js'
import UserRatings from './user-ratings/UserRatings.js'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { getUserRatings } from './apiCalls'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: null,
      user: {},
      ratings: []
    };
  }

  setUser = (newUser) => {
    this.setState({user: newUser})
    this.fetchUserRatings(this.state.user.id)
  }

  submitLogout = (event) => {
    this.setState({ user: {} })
    this.setState({ ratings: [] })
  }

  fetchUserRatings = (id) => {
     getUserRatings(id)
    .then(data => this.setState({ ratings: data.ratings }))
    .catch(error => this.setState({ error, isLoading: false}));
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
            <Link to="/">
            <button
              type="button"
              onClick={event => this.submitLogout(event)}>Logout
            </button>
            </Link>
            <img className='flim-reel' src={Film}/>
          </header>
              <Route exact path='/' render={ () => <Movies movieRatings={this.state.ratings} /> } />
              <Route exact path='/signin' render={ () => <Login setUser={this.setUser} userId={this.state.user.id}/> } />
              <Route
                exact path="/movies/:movie_id"
                render={({ match }) => {
                  const { movie_id } = match.params;
                  return <SingleMovie movieID={movie_id} movieRatings={this.state.ratings} userStatus={this.state.user} fetchUserRatings={this.fetchUserRatings}/>
                }}
              />
      </section>
    )
  }
}

export default App;
