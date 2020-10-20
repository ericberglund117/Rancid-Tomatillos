import React from 'react';
import Movies from '../movies/Movies.js';
import { render, waitFor, screen, getByText,
  getByAltText, getByTitle, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import UserRatings from './UserRatings.js';
import { deleteMovieRatings } from '../apiCalls.js'
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
        <UserRatings  movieRatings={ratings} movieID={movieID} />
      </MemoryRouter>
    )
    expect(screen.getByText('Already Rated')).toBeInTheDocument();
    expect(screen.getByRole('button', { name:'Delete Rating' })).toBeInTheDocument();
  })

  it('Should render the rating options if the user has not rated the movie', () => {
    const ratings = [{
      created_at: "2020-10-15T21:31:06.428Z",
      id: 2887,
      movie_id: 613504,
      rating: 4,
      updated_at: "2020-10-15T21:31:06.428Z",
      user_id: 80
    }]
    const movieID="61350";

    render(
      <MemoryRouter>
        <UserRatings  movieRatings={ratings} movieID={movieID} />
      </MemoryRouter>
    )
    expect(screen.getByText('Select a movie rating option(1-lowest, 10-highest)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name:'Submit Rating' })).toBeInTheDocument();
  })

  it('Should change the input rating value', () => {
    const ratings = [{
      created_at: "2020-10-15T21:31:06.428Z",
      id: 2887,
      movie_id: 613504,
      rating: 4,
      updated_at: "2020-10-15T21:31:06.428Z",
      user_id: 80
    }]
    const movieID="61350";

    render(
      <MemoryRouter>
        <UserRatings  movieRatings={ratings} movieID={movieID} />
      </MemoryRouter>
    );
    const ratingInputValue = 3
    const ratingInput = screen.getByText('Select a movie rating option(1-lowest, 10-highest)');

    expect(ratingInput).toBeInTheDocument();
    expect(screen.getByRole('button', { name:'Submit Rating' })).toBeInTheDocument();

    ratingInput.value = ratingInputValue
    fireEvent.change(ratingInput);
  })

  it('A user should be able to delete a rating', async () => {
    deleteMovieRatings.mockResolvedValueOnce()
    const ratings = [{
      created_at: "2020-10-15T21:31:06.428Z",
      id: 2887,
      movie_id: 613504,
      rating: 4,
      updated_at: "2020-10-15T21:31:06.428Z",
      user_id: 80
    }]
    const movieID="613504";
    const userId = { id: 80 }

    render(
      <MemoryRouter>
        <UserRatings  movieRatings={ratings} movieID={movieID} userStatus={userId} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name:'Delete Rating' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name:'Delete Rating' }))
  })
})
