import React, { Component } from 'react';
import "./UserRatings.css"
import Movies from '../movies/Movies.js'
import { getUserRatings } from '../apiCalls'

export default class UserRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      isLoading: false,
      error: '',
    };
  }

  fetchUserRatings(id) {
    getUserRatings(id)
    .then(data => this.setState({ ratings: data.ratings }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

}
