import React, { Component } from 'react';
import Movies from './Movies.js';
import {render, screen } from '@testing-library/react'

describe("Movies", () => {
  it("Should render a movie", () => {
    render(
      <Movie
        image=
          <img
            src='https://image.tmdb.org/t/p/original/
            /aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg'
            className='image-poster'
          />
        id={3}
        title='Mulan'
        rating={6}
        date='2020-09-04'
      />
    )
    expect(sreen.Movie.toHaveAttribute('src',
      'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg'))
  })
})
