import React, { Component } from 'react';
import Api from './Api';
import './App.css';
import Film from './images/film-reel.png'
import Movies from './Movies.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong...');
      }
    })
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  // separateMovies() {
  //   const moviesToDisplay = this.state.movies.map((movie, index)=> {
  //     return (
  //       <article key={index} className='poster-card' id={movie.id}>
  //         <img className='image-poster' src={movie.poster_path}></img>
  //         <section className='poster-card-text'>
  //           <h2 className='title-poster'>{movie.title}</h2>
  //           <h3 className='rating-poster'>{movie.average_rating}</h3>
  //           <h3 className='release-date-poster'>{movie.release_date}</h3>
  //         </section>
  //       </article>
  //     )
  //   })
  //   return (
  //     <section className="movies-list">
  //       {moviesToDisplay}
  //     </section>
  //   )
  // }

  render() {
    const { movies, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <section>
        <header>
          <h1>Rancid Tomatillos</h1>
        </header>
        <section className='all-cards'>
        < Movies movies={this.state.movies} />
        </section>
      </section>
    )
  }
}

export default App;
