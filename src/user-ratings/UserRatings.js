import React, { Component } from 'react';
import "./UserRatings.css"
import SingleMovie from '../single-movie/SingleMovie.js'
import { getMovieRatings, deleteMovieRatings } from '../apiCalls.js'


export default class UserRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRating: 1,
      error: '', 
      delete: false,
    }
    this.changeValue = this.changeValue.bind(this);
  }

  fetchMovieRatingsData(userId, movieId, ratings) {
    getMovieRatings(userId, movieId, ratings)
    .then(() => this.props.fetchUserRatings(userId))
    .catch(error => this.setState({error: error.message}))
  }

  submitRating(event) {
    const { userStatus, movieID } = this.props
    const rating = this.state.selectedRating
    this.fetchMovieRatingsData(userStatus.id, movieID, rating)
  }

  fetchDeleteMovieRatings(userID, movieID) {
    deleteMovieRatings(userID, movieID)
     .then(() => this.props.fetchUserRatings(userID))
     .then(() => this.setState({delete: true}))
     .catch(error => this.setState({error: error.message}))
  }

  delteRating(event) {
    const { userStatus, movieID } = this.props
    let userMovieRating = this.checkMovieRating(movieID);
    this.fetchDeleteMovieRatings(userStatus.id, userMovieRating.id)
  }

  changeValue(event) {
    this.setState({selectedRating: event.target.value})
  }

  checkMovieRating(movieId) {
    let ratings = this.props.movieRatings
      let userMovieRating = ratings.find(rating => {
        return parseInt(movieId) === rating.movie_id
      })
      return userMovieRating
    }

  render() {
    if(this.checkMovieRating(this.props.movieID)) {
      return (
        <section className='delete-rating'>
          <label className='delete-lable'>
            Already rated
          </label>
          <button 
            type="button"
            className='delete-button'
            onClick={event => this.delteRating(event)}>
            Delete Rating
          </button>
        </section> 
      )
    } else {
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
}
