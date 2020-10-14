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

  fetchMovieRatingsData(userId, movieId, ratings) {
    getMovieRatings(userId, movieId, ratings)
    .then(console.log('hi')) //invoke get fetch request from app. need to pass function down through props from app
  }

  rateMovie(event) {
    if(Object.keys(this.props.userStatus).length > 0) {
      this.setState({ toggle: true })
      // fetch request (need userID movieId and this.props.movieRatings--use this to set state once have a response. then invoke get request of updated ratings)
      this.fetchMovieRatingsData(this.props.movieID, )
    } else {
      alert("You have to login in order to give your professional opinion about this movie")
    }
  }
  // allow user to rate movie
    //post request
    // reinvoke function instead of this.setState---another fetch request will naturally set ratings
    // will return the updated state of movie ratings
  //conditionally render depending on if they have already rated it.
    // singleMovie - find
    // movies - find but will be diff b/c have to iterate through all movies

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
        {this.state.toggle ? <UserRatings toggle={this.state.toggle} /> : <></>}
        <h3 className='rating-poster-single'>
          Average Rating: {this.state.singleMovie.average_rating}
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
