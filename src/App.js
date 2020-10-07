import React, { Component } from 'react';
import Api from './Api';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(response => response.json())
    .then(data => this.setState({ movies: data.movies }));
  }

  separateMovies() {
    const moviesToDisplay = this.state.movies.map((movie, index)=> {
      return (
        <section key={index} className='poster-card' id={movie.id}>
          <img className='image-poster' src={movie.poster_path}></img>
          <section className='poster-card-text'>
            <h2 className='title-poster'>{movie.title}</h2>
            <h3 className='rating-poster'>{movie.average_rating}</h3>
            <h3 className='release-date-poster'>{movie.release_date}</h3>
          </section>
        </section>
      )
    })
    return (
      <section className="movies-list">
        {moviesToDisplay}
      </section>
    )
  }

  render() {
    return (
      <section>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>
        <section className='all-cards'>{this.separateMovies()}</section>
      </section>
    )
  }
}

export default App;
