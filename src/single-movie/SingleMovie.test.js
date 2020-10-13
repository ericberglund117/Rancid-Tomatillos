import React from 'react';
import Movies from '../movies/Movies.js';
import SingleMovie from './SingleMovie'
import { render, waitFor, screen, getByText,
  getByAltText, getByTitle} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import  { getSingleMovie }  from '../apiCalls.js'
jest.mock('../apiCalls.js')


describe("Single Movie", () => {
  it('should render a single movie', async () => {
    getSingleMovie.mockResolvedValueOnce({ movie:
      {
        id: 694919,
        title: "Money Plane",
        poster_path: "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        release_date: "2020-09-29",
        overview: "A professional thief with $40 million in debt.",
        genres: ["Action"],
        budget: 0,
        revenue: 0,
        runtime: 82,
        tagline: "They're grrreat",
        average_rating: 9
       },
     })
    render(
      <MemoryRouter>
        <SingleMovie  />
      </MemoryRouter>
    );
    // check that there is a container element on the page
    const moviesContainer = screen.getByTitle("single-movie");
    const movieTitle = await waitFor(() => screen.getByText('Money Plane'))
    const moviePoster = await waitFor(() => screen.getByAltText('image-poster-backdrop'))
    const movieDate = await waitFor(() => screen.getByText('Release Date: 2020-09-29'))
    const movieRating = await waitFor(() => screen.getByText('Average Rating: 9'))
    const movieOverview = await waitFor(() => screen.getByText('Overview: A professional thief with $40 million in debt.'))
    const movieGenres = await waitFor(() => screen.getByText('Genres: Action'))
    const movieBudget = await waitFor(() => screen.getByText('Budget: 0'))
    const movieRevenue = await waitFor(() => screen.getByText('Revenue: 0'))
    const movieRuntime = await waitFor(() => screen.getByText('Runtime: 82'))
    const movieTagline = await waitFor(() => screen.getByText('They\'re grrreat'))
    // check that there are movies on the page
    expect(moviesContainer).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    expect(movieDate).toBeInTheDocument();
    expect(movieRating).toBeInTheDocument();
    expect(movieOverview).toBeInTheDocument();
    expect(movieGenres).toBeInTheDocument();
    expect(movieBudget).toBeInTheDocument();
    expect(movieRevenue).toBeInTheDocument();
    expect(movieRuntime).toBeInTheDocument();
    expect(movieTagline).toBeInTheDocument();
    })
})
