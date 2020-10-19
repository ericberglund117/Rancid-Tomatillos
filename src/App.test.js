import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { getAllMovies, getUserRatings, getUser } from './apiCalls.js'
import userEvent from '@testing-library/user-event'
jest.mock('./apiCalls.js')

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
  })

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
  })

  it('Should be able to render a user\'s ratings for movies after logging in', async () => {
    // have to test to see "you have not rated this movie...yet" or 'your rating: '
    // this relies on the displayMovieRating function in Movies
    // look at singleMovie test
    //  HOW DO WE TEST IF A USER HAS SUCCESSFULLY LOGGED IN?
      // if we see the header change 'Welcome, Ken' then we know a user has successfully logged in
      // then we can test if the user's ratings appear
    const user = {
      email: "ken@turing.io",
      id: 80,
      name: "Ken"
    }
    // getUser.mockResolvedValue(user)
    // getUserRatings.mockResolvedValueOnce(ratings)
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
    userEvent.click(loginButton)
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(screen.getByPlaceholderText('Email'), "ken@turing.io")
    userEvent.type(screen.getByPlaceholderText('Password'), "654321")
    userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    const findUser = await waitFor(() => screen.getByText('Ken'))
    //expect(mockSetUser).toHaveBeenCalledTimes(1)
    // getAllMovies.mockResolvedValueOnce(expectedReturn)
    // did form show up
    // did input forms appear -input type-getByText
    // was submit button clicked
    // can query elements looing for in steps to get to expect for final goal
    //find input, interact, button, interact
    // then expect goal to be in document
    // expect login component to run
    //expect(getUser).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('wrapper')).toBeInTheDocument();
    expect(await waitFor(() => screen.getByText('Welcome Ken!')))
    expect(await waitFor(() => screen.getByText('Your Rating: 4'))).toBeInTheDocument()
  })

  //ANY MAJOR USER STORIES
  // login, update ratings
  // click on movie
  // do as many acceptance tests as can
  //test logout functionality (integration?)
  //how to test if render right paths?
  // need to identify if a user has logged in
    // click submit login render back to homepage with different greeting in headers
  // sad path testing?
  // user can click login and logout and logo button
  // user can click a movie card and route to singleMovie page
})
