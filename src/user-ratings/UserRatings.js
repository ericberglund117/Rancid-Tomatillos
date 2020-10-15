import React, { Component } from 'react';
import "./UserRatings.css"
import SingleMovie from '../single-movie/SingleMovie.js'
import { getMovieRatings } from '../apiCalls.js'


export default class UserRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRating: null,
      error: ''
    }
    this.changeValue = this.changeValue.bind(this);
  }

  fetchMovieRatingsData(userId, movieId, ratings) {
    console.log('hello')
    getMovieRatings(userId, movieId, ratings)
    .then(() => this.props.fetchUserRatings(userId))
    .catch(error => this.setState({error: error.message}))
  }

  submitRating(event) {
    const { userStatus, movieID } = this.props
    const rating = this.state.selectedRating
    this.fetchMovieRatingsData(userStatus.id, movieID, rating)
    //if single movie has rating, then display 'Please to delete current rating if you want to update your rating'
    // else this.fetchMovieRatingsData
  }

  changeValue(event) {
    this.setState({selectedRating: event.target.value})
  }


  // fetch request (need userID movieId and this.props.movieRatings--use this to set state once have a response. then invoke get request of updated ratings)
  //this.fetchMovieRatingsData(this.props.movieID, )
  // allow user to rate movie
    //post request
    // reinvoke function instead of this.setState---another fetch request will naturally set ratings
    // will return the updated state of movie ratings
  //conditionally render depending on if they have already rated it.
    // singleMovie - find
    // movies - find but will be diff b/c have to iterate through all movies

  render() {
    return (
      <form className="ratings-dropdown">
        <label htmlFor="ratings">Select a movie rating option(1-lowest, 10-highest)</label>
        <select id="movie-ratings"
                name="movie-ratings"
                defaultValue={this.state.selectedRating}
                onChange={this.changeValue}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <button type="button"
                onClick={event => this.submitRating(event)}>Submit Rating</button>
      </form>
    )
  }
}
