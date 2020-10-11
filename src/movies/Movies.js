import React, { Component } from 'react';
import { getAllMovies } from '../apiCalls'
import "./Movies.css"

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  componentDidMount () {
    getAllMovies()
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }


  // displayMovieCards() {
  //   return this.state.movies.map((movie, index) => {
  //     return (
  //       <article key={index} className='poster-card' id={movie.id}>
  //         <img alt='image-poster' src={movie.poster_path}></img>
  //         <section className='poster-card-text'>
  //           <h2 className='title-poster'>{movie.title}</h2>
  //           <h3 className='rating-poster'>Average Rating: {movie.average_rating}</h3>
  //           <h3 className='release-date-poster'>Release Date: {movie.release_date}</h3>
  //         </section>
  //       </article>
  //     )
  //   })
  // };

  render () {
    return (
      <>
        <section className="movies-list">
          { this.state.movies.map((movie, index) => {
            return (
              <article key={index} className='poster-card' id={movie.id}>
                <img alt='image-poster' src={movie.poster_path}></img>
                <section className='poster-card-text'>
                  <h2 className='title-poster'>{movie.title}</h2>
                  <h3 className='rating-poster'>Average Rating: {movie.average_rating}</h3>
                  <h3 className='release-date-poster'>Release Date: {movie.release_date}</h3>
                </section>
              </article>)
          })
            }
        </section>
      </>
    )
  }
};
