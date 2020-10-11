import React from 'react';
import { render, waitFor, screen } from '@testing-library/react'
import Movies from './Movies.js';
import '@testing-library/jest-dom'
jest.mock('../apiCalls.js')
//import {Router} from 'react-router-dom'

describe("Movies", () => {
  beforeEach(() => {
    // getAllMovies = jest.fn();
    mockResponse = {then: () => {json: () => {}}}
    movie = [{
      "id": 524047,
      "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
      "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
      "title": "Money Plane",
      "average_rating": 9,
      "release_date": "2020-07-29"
    }]
  });

  it('should render a movie', async () => {

    await waitFor(getAllMovies.mockResolvedValue({
      then: () => {json: () => {}}
    }))

    render(<Movies  />);

    expect(fetch).toHaveBeenCalled();
      // screen.debug();
      // expect(screen.getByText('Money Plane')).toBeInTheDocument();
      // expect(screen.getByText("Average Rating: 9")).toBeInTheDocument();
      // expect(screen.getByText("Release Date: 2020-07-29")).toBeInTheDocument();
      // expect(screen.getByAltText("image-poster")).toBeInTheDocument();
    })
})
  // let container = null;
  // beforeEach(() => {
  //   container = document.createElement('section')
  //   document.body.appendChild(container)
  // })
  //
  // it("Should display movies section", () => {
  //   const mockDisplayMovies = jest.fn();
  //   act(() => {
  //     render(<Movies />, container);
  //   });
  //   screen.debug();
  //   expect(container).toBeInTheDocument();
  //   expect(mockDisplayMovies).toHaveBeenCalled();
  // })