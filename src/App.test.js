import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getAllMovies, getUserRatings, getUser } from './apiCalls.js';
jest.mock('./apiCalls.js');

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
  movie_id: 694919,
  rating: 4,
  updated_at: "2020-10-15T21:31:06.428Z",
  user_id: 80
}];

describe('App', () => {
  it('should be able to render on page load', () => {
    getAllMovies.mockResolvedValueOnce(expectedReturn)
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);

      const loginButton = screen.getByRole('button', { name: "Login"})
      const logoutButton = screen.getByRole('button', { name: "Logout"})
      expect(screen.getByTitle('header')).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
      expect(screen.getByRole('wrapper')).toBeInTheDocument();
  });

  it('Should be able to render no ratings for movies if a user has not rated any movies', async () => {
    getAllMovies.mockResolvedValueOnce(expectedReturn)
    getUser.mockResolvedValueOnce()
    getUserRatings.mockResolvedValueOnce()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(await waitFor(() => screen.getByText('You Have Not Rated This Movie...Yet'))).toBeInTheDocument()
  });

  it('Should be able to render a user\'s ratings for movies after logging in', async () => {
    const user = {
      email: "ken@turing.io",
      id: 80,
      name: "Ken"
    }

    const mockSetUser = jest.fn()
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

    getAllMovies.mockResolvedValue(expectedReturn)
    getUser.mockResolvedValueOnce({
      email: "ken@turing.io",
      id: 80,
      name: "Ken"
    })

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);

    const loginButton = screen.getByRole('button', { name: "Login"})
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton)
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.type(screen.getByPlaceholderText('Email'), "ken@turing.io")
    fireEvent.type(screen.getByPlaceholderText('Password'), "654321")
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))
    const findUser = await waitFor(() => screen.getByText('Ken'))

    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(await waitFor(() => screen.getByText('Welcome Ken!')))
    expect(await waitFor(() => screen.getByText('Your Rating: 4'))).toBeInTheDocument()
  });
})
