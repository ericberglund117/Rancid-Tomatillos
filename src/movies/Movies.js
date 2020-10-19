import React, { Component } from 'react';
import { getAllMovies } from '../apiCalls'
import "./Movies.css"
import SingleMovie from "../single-movie/SingleMovie.js"
import {} from "../user-ratings/UserRatings.js"
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      showComponent: false,
    };
  }

  componentDidMount () {
    getAllMovies()
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  displayMovieRating(movieId) {
    let ratings = this.props.movieRatings
     let userMovieRating = ratings.find(rating => {
        return movieId === rating.movie_id
      })
      return userMovieRating ?
      <h3 className='user-rated-poster'>Your Rating: {userMovieRating.rating} </h3> :
      <h3 className='user-rated-poster'>You Have Not Rated This Movie...Yet</h3>
    }

  displayMovieInformation() {
    return this.state.movies.map((movie, index) => {
      return (
        <Link to={`movies/${movie.id}`} key={index} className='poster-card' title='poster-card' id={movie.id}>
          <img
            alt='image-poster'
            data-id={movie.id}
            src={movie.poster_path}
          />
          <section className='poster-card-text'>
            <h2 className='title-poster'>{movie.title}</h2>
            <h3 className='rating-poster'>Average Rating: {Math.round(movie.average_rating) }</h3>
            {this.displayMovieRating(movie.id)}
            <h3 className='release-date-poster'>Release Date: {movie.release_date}</h3>
          </section>
        </Link>)
      })
  }

  render() {
    return (
        <section className="movies-list" title="movies-list">
          { this.displayMovieInformation() }
        </section>
    )
  }
};

Movies.propTypes = {
  movieRatings: PropTypes.arrayOf(PropTypes.object),
}
