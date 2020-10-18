import React from 'react';
import Movies from '../movies/Movies.js';
import SingleMovie from '../single-movie/SingleMovie.js'
import { render, waitFor, screen, getByText,
  getByAltText, getByTitle} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import UserRatings from './UserRatings.js';
jest.mock('../apiCalls.js')


describe("User Rating A Movie", () => {
  it('Should render the delete options if already rated', () => {
    const ratings = [{
      created_at: "2020-10-15T21:31:06.428Z",
      id: 2887,
      movie_id: 613504,
      rating: 4,
      updated_at: "2020-10-15T21:31:06.428Z",
      user_id: 80
    }]
    const movieID="613504";

    render(
      <MemoryRouter>
        <UserRatings  movieRatings={ratings} movieID={movieID}/>
      </MemoryRouter>
    )
    expect(screen.getByText('Already Rated')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
})



