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
    .then(data => this.setState({ ratings: data }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  componentDidMount() {
    console.log(this.state)
    this.fetchUserRatings(78)
    this.helper()
  }

  helper() {
    console.log(this.state)
  }

  render(){
    return (
      <Movies userRatings={this.state.ratings}/>
    )
  }
}
