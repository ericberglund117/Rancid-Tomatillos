import React, { Component } from 'react';
import "./SingleMovie.css"
import Movies from '../movies/Movies.js'
import { getSingleMovie, getMovieRatings } from '../apiCalls'
import UserRatings from '../user-ratings/UserRatings.js'


export default class SingleMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleMovie: {
        title: '',
        backdrop_path: '',
        tagline: '',
        average_rating: 0,
        overview: '',
        release_date: '',
        genres: [],
        budget: '',
        revenue: 0,
        runtime: ''
      },
      toggle: false
    };
  }

  fetchSingleMovieData(id) {
    getSingleMovie(id)
    .then(data => this.setState({ singleMovie: data.movie }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  componentDidMount() {
    this.fetchSingleMovieData(this.props.movieID)
  }

  rateMovie(event) {
    if(Object.keys(this.props.userStatus).length > 0) {
      this.setState({ toggle: true })
    } else {
      alert("You have to login in order to give your professional opinion about this movie")
    }
  }

  render() {

    return (
      <section className="single-movie" title="single-movie">
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
        <button type="button"
                onClick={event => this.rateMovie(event)}>Rate This Movie!</button>
        {this.state.toggle ? <UserRatings movieID={this.props.movieID} movieRatings={this.props.movieRatings} userStatus={this.props.userStatus} fetchUserRatings={this.props.fetchUserRatings}/> : <></> }
        <h3 className='rating-poster-single'>
          Average Rating: {this.state.singleMovie.average_rating}
        </h3>
        <h3 className='rating-poster-single'>
          Your Rating: {this.state.movieRatings}
        </h3>
        <h3 className='overview'>
          Overview: {this.state.singleMovie.overview}
        </h3>
        <h3 className='release-date-single'>
          Release Date: {this.state.singleMovie.release_date}
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
