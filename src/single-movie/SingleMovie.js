import React, { Component } from 'react';
import "./SingleMovie.css"
import Movies from '../movies/Movies.js'
import { getSingleMovie } from '../apiCalls'


export default class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleMovie: {},
    };
  }

  fetchSingleMovieData(id) {
    getSingleMovie(id)
    .then(data => this.setState({ singleMovie: data.movie }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  componentDidUpdate(prevProps) {
    if (this.props.movieID !== prevProps.movieID) {
      this.fetchSingleMovieData(this.props.movieID)
    }
  }

  render() {
    return (
      <section className="single-movie">
        <h2 className='title-poster-backdrop'>
          {this.state.singleMovie.title}
        </h2>
        <img
          alt='image-poster-backdrop'
          className="image-poster-backdrop"
          src={this.state.singleMovie.backdrop_path}
        />
        <h3 className='tagline-single'>
          {this.state.singleMovie.tagline}
        </h3>
        <h3 className='rating-poster-single'>
          Average Rating: {this.state.singleMovie.average_rating}
        </h3>
        <h3 className='overview'>
          Overview: {this.state.singleMovie.overview}
        </h3>
        <h3 className='release-date-single'>
          Average Rating: {this.state.singleMovie.release_date}
        </h3>
        <h3 className='genres-single'>
          Genres: {this.state.singleMovie.genres}
        </h3>
        <h3 className='budget-single'>
          Budget: {this.state.singleMovie.budget}
        </h3>
        <h3 className='revenue-single'>
          Revenue: {this.state.singleMovie.revenue}
        </h3>
        <h3 className='runtime-single'>
          Runtime: {this.state.singleMovie.runtime}
        </h3>
      </section>
    )
  }
}
