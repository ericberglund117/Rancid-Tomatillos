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
        <section key={index}>
          <img src={movie.poster_path}></img>
          <h2>{movie.title}</h2>
          <h3>{movie.average_rating}</h3>
          <h3>{movie.release_date}</h3>
        </section>
      )
    })
    return (
      <section className="movies-list">
        <h2>{moviesToDisplay}</h2>
      </section>
    )
  }

  render() {
    return (
      <section>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>
        <h2>{this.separateMovies()}</h2>
      </section>
    )
  }
}

export default App;
