import React, { Component } from 'react';
import "./UserRatings.css"
import SingleMovie from '../single-movie/SingleMovie.js'


export default class UserRatings extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <form className="ratings-dropdown">
        <label htmlFor="ratings">Select a movie rating option(1-lowest, 10-highest)</label>
        <select id="movie-ratings" name="movie-ratings">
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
                onClick={event => this.submitRating}>Submit Rating</button>
      </form>
    )
  }
}
