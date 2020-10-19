import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { getAllMovies } from './apiCalls.js'
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
  movie_id: 613504,
  rating: 4,
  updated_at: "2020-10-15T21:31:06.428Z",
  user_id: 80
}];

it('renders without crashing', () => {
getAllMovies.mockResolvedValueOnce(expectedReturn)
  const div = document.createElement('div');
  ReactDom.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  ReactDom.unmountComponentAtNode(div);
});

describe('App', () => {
  it('should be able to render movies to the DOM on page load', () => {
    getAllMovies.mockResolvedValueOnce(expectedReturn)
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);

      expect(screen.getByTitle('header')).toBeInTheDocument();
      expect(screen.getByRole('wrapper')).toBeInTheDocument();
  })
})
