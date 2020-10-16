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


  //some sort of conditional rendering depending on if rating is available
    //use this to display delete button 

  //to delete a rating
    // need to get rating id for delete request
    //use /users/:user_id/ratings/:rating_id in endpoint
      // need user id and rating id
    // will get 204 status code (NO CONTENT in response body) as response
    //fetch(‘https://rancid-tomatillos.herokuapp.com/api/v2/users/:user_id/ratings/:rating_id', {
    // method: ‘DELETE’
    // })
    //find a way to get the rating id to pass into the endpoint
    //on click of delete button
    //iterate through this.props.movieRatings
    // refactor function below and then the conditional render will change depending on movies, singlemovie, and delete
      // let ratings = this.props.movieRatings
       //let userMovieRating = ratings.find(rating => {
        //  return parseInt(movieId) === rating.movie_id
        //})
        //return userMovieRating
    // will need conditional if there is no rating

  checkMovieRating(movieId) {
    let ratings = this.props.movieRatings
      let userMovieRating = ratings.find(rating => {
        return parseInt(movieId) === rating.movie_id
      })
      return userMovieRating.id
    }

  render() {
    return (
      {this.checkMovieRating(this.props.movieID)} 
      ?
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
  
      :
      <section className='delete-rating'>
        <label className='delete-lable'>
          Already rated
        </label>
        <button 
          type="button"
          className='delete-button'
          onClick={event => this.submitRating(event)}>
          Delete Rating
        </button>
      </section> 
    )
  }
}
