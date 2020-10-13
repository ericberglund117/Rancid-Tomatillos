import React from 'react';
import Movies from './Movies';
import { render, waitFor, screen, getByText,
  getByAltText, getByTitle} from '@testing-library/react'
import { getAllMovies } from '../apiCalls.js';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
jest.mock('../apiCalls.js')
//import {Router} from 'react-router-dom'


describe("Movies", () => {
  it('should render a movie', async () => {
    getAllMovies.mockResolvedValueOnce({ movies: [
      {
         id: 694919,
         poster_path: "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
         backdrop_path: "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
         title: "Money Plane",
         average_rating: 9,
         release_date: "2020-09-29"
       },
    ]})
    render(
      <MemoryRouter>
        <Movies  />
      </MemoryRouter>
    );
    // check that there is a container element on the page
    const moviesContainer = screen.getByTitle("movies-list");
    const movieTitle = await waitFor(() => screen.getByText('Money Plane'))
    const movieDate = await waitFor(() => screen.getByText('Release Date: 2020-09-29'))
    const movieRating = await waitFor(() => screen.getByText('Average Rating: 9'))
    const moviePoster = await waitFor(() => screen.getByAltText('image-poster'))
    // check that there are movies on the page
    expect(moviesContainer).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieDate).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    })
})
