import React from 'react';
import Movies from './Movies';
import { MemoryRouter } from 'react-router-dom'
import { render, waitFor, screen, getByText, getByAltText, getByTitle} from '@testing-library/react'
import { getAllMovies } from '../apiCalls';
import '@testing-library/jest-dom'
jest.mock('../apiCalls.js')
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../Test-utils.js'

//import {Router} from 'react-router-dom'


describe("Movies", () => {
  it('should render a movie', async () => {
    const expectedReturn = { movies: [
      {
        id: 694919,
        title: "Money Plane",
        poster_path: "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        release_date: "2020-09-29",
        overview: 'This is a movie',
        average_rating: 9,
      }
    ]};
    const ratings = [{
        created_at: "2020-10-15T21:31:06.428Z",
        id: 2887,
        movie_id: 613504,
        rating: 4,
        updated_at: "2020-10-15T21:31:06.428Z",
        user_id: 80
  }];

  getAllMovies.mockResolvedValueOnce(expectedReturn)
    render(
      <MemoryRouter>
        <Movies movieRatings={ratings}/>
      </MemoryRouter>
    );
    // check that there is a container element on the page
    const moviesContainer = screen.getByTitle("movies-list");
    const movieTitle = await waitFor(() => screen.getByText("Money Plane"))
    const movieDate = await waitFor(() => screen.getByText("Release Date: 2020-09-29"))
    const movieRating = await waitFor(() => screen.getByText("Average Rating: 9"))
    const moviePoster = await waitFor(() => screen.getByAltText("image-poster"))
    // check that there are movies on the page
    expect(getAllMovies).toHaveBeenCalledTimes(1)
    expect(moviesContainer).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieDate).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    })

  // it('should get movie ID', () => {
  //   const route = 'movies/694919'
  //   renderWithRouter(<Movies />, { route })
  //     expect(screen.getByText('/')).toBeInTheDocument()
  //
  //   const leftClick = { button: 0}
  //   userEvent.click(screen.getByText(route), leftClick)
  //
  //   expect(screen.getByText(route)).toBeInTheDocument()
  // })
})
