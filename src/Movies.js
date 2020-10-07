import React, { Component } from 'react';
import "./Movies.css"

const Movies = ({movies}) => {
    const moviesToDisplay = movies.map((movie, index)=> {
      return (
        <article key={index} className='poster-card' id={movie.id}>
          <img className='image-poster' src={movie.poster_path}></img>
          <section className='poster-card-text'>
            <h2 className='title-poster'>{movie.title}</h2>
            <h3 className='rating-poster'>{movie.average_rating}</h3>
            <h3 className='release-date-poster'>{movie.release_date}</h3>
          </section>
        </article>
      )
    })
    return (
      <section className="movies-list">
        {moviesToDisplay}
      </section>
    )
}


export default Movies;
