import React, { Component } from 'react';
import { getAllMovies } from '../apiCalls'
import "./Movies.css"
import SingleMovie from "../single-movie/SingleMovie.js"
import {} from "../user-ratings/UserRatings.js"
import { Link } from 'react-router-dom';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      showComponent: false,
      selectMovieId: undefined
    };
    this.getMovieID = this.getMovieID.bind(this);
  }

  getMovieID(event) {
    let movie_id = event.currentTarget.dataset.id
    this.setState({ showComponent: true })
    this.setState({ selectMovieId: movie_id })
  };

  componentDidMount () {
    getAllMovies()
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  displayMovieRating() {
    let ratings = this.props.movieRatings
    let movies = this.state.movies
     movies.find(movie => {
        ratings.find(rating => {
        if (movie.id === rating.movie_id) {
          return rating
        }
        })
      })
  }


  render() {
    return (
        <section className="movies-list" title="movies-list">
          { this.state.movies.map((movie, index) => {
            return (
              <Link to={`movies/${movie.id}`} key={index} className='poster-card' title='poster-card' id={movie.id}>
                <img
                  alt='image-poster'
                  data-id={movie.id}
                  src={movie.poster_path}
                />
                <section className='poster-card-text'>
                  <h2 className='title-poster'>{movie.title}</h2>
                  <h3 className='rating-poster'>Average Rating: {movie.average_rating}</h3>
                  <h3 className='user-rated-poster'>Your Rating: {this.displayMovieRating()}</h3>
                  <h3 className='user-rated-poster'>Not yet rated</h3>
                  <h3 className='release-date-poster'>Release Date: {movie.release_date}</h3>
                </section>
              </Link>)
            })
          }
        </section>
    )
  }
};
