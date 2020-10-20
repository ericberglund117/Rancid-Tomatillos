import React, { Component } from 'react';
import './App.css';
import Film from './images/film-reel.png';
import Tomatillos from './images/tomatillo.png';
import Movies  from './movies/Movies.js';
import Login from './login/Login.js';
import SingleMovie  from './single-movie/SingleMovie.js'
import { Route, Link } from 'react-router-dom';
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
    console.log('set')
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
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{'Something went wrong...'}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section>
          <header className='header'>
            <Link to='/' className='login-section-link'>
            <section className= "logo-section">
              <img className='logo' src={Tomatillos}/>
              <h1 className='home'>Rancid <br></br>Tomatillos</h1>
              <Link to='/signin' className='login-button'>
              <button 
              type="button" 
              className='log-button'
              >
                Login
              </button>
              </Link>
            <Link to="/" className='logout-button'>
            <button
              type="button"  
              className='log-button'            
              onClick={event => this.submitLogout(event)}
            >
              Logout
            </button>
            </Link>
            </section>
            </Link>
            <h2 className='welcome-text'> Welcome {this.state.user.name || 'Movie Goer'}!</h2>
            <img className='flim-reel' src={Film}/>
          </header>
          <div role='wrapper'>
              <Route exact path='/' render={ () => <Movies movieRatings={this.state.ratings} checkMovieRating={this.checkMovieRating}/> } />
              <Route exact path='/signin' render={ () => <Login setUser={this.setUser} userId={this.state.user.id}/> } />
              <Route
                exact path="/movies/:movie_id"
                render={({ match }) => {
                  const { movie_id } = match.params;
                  return <SingleMovie movieID={movie_id}
                  movieRatings={this.state.ratings}
                  userStatus={this.state.user}
                  fetchUserRatings={this.fetchUserRatings} />
                }} />
          </div>
      </section>
    )
  }
}

export default App;
