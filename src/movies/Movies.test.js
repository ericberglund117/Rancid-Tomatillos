import React from 'react';
import { render, waitFor, screen } from '@testing-library/react'
import Movies from './Movies';
import '@testing-library/jest-dom';
import { getAllMovies } from '../apiCalls.js';
jest.mock('../apiCalls.js');
import Movies from './Movies.js';
import '@testing-library/jest-dom'
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
    //render component
    const { getByTitle, getByText, getByAltText } = render(<Movies  />);
    // check that there is a container element on the page
    const moviesContainer = getByTitle("movies-list");
    const movieTitle = await waitFor(() => getByText('Money Plane'))
    const movieDate = await waitFor(() => getByText('Release Date: 2020-09-29'))
    const movieRating = await waitFor(() => getByText('Average Rating: 9'))
    const moviePoster = await waitFor(() => getByAltText('image-poster'))
    // check that there are movies on the page
    expect(moviesContainer).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieDate).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    })
})
