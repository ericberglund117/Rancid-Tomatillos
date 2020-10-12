import React, { Component } from 'react';
import { getAllMovies } from '../apiCalls'
import "./Movies.css"
import SingleMovie from "../single-movie/SingleMovie.js"

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      showComponent: false,
      selectMovieId: 0
    };
    this.getMovieID = this.getMovieID.bind(this);
  }

  getMovieID(event) {
    let movieID = event.currentTarget.dataset.id
    this.setState({ showComponent: true })
    this.setState({ selectMovieId: movieID })
  };

  componentDidMount () {
    getAllMovies()
    .then(data => this.setState({ movies: data.movies }))
    .catch(error => this.setState({ error, isLoading: false}));
  }

  render() {
    return (
        <section className="movies-list" title="movies-list">
          { this.state.movies.map((movie, index) => {
            return (
              <article key={index} className='poster-card' title='poster-card' id={movie.id}>
              <img
                alt='image-poster'
                data-id={movie.id}
                src={movie.poster_path}
                onClick={this.getMovieID}></img>
                <section className='poster-card-text'>
                  <h2 className='title-poster'>{movie.title}</h2>
                  <h3 className='rating-poster'>Average Rating: {movie.average_rating}</h3>
                  <h3 className='release-date-poster'>Release Date: {movie.release_date}</h3>
                </section>
              </article>)
            })
          }
          {this.state.showComponent ?
          <SingleMovie movieID={this.state.selectMovieId} /> : null
        }
        </section>
    )
  }
};
