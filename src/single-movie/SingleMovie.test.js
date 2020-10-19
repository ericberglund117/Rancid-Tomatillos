import React from 'react';
import SingleMovie from './SingleMovie'
import { render, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import  { getSingleMovie }  from '../apiCalls.js'
jest.mock('../apiCalls.js')

const ratings = [{
  created_at: "2020-10-15T21:31:06.428Z",
  id: 2887,
  movie_id: 613504,
  rating: 4,
  updated_at: "2020-10-15T21:31:06.428Z",
  user_id: 80
}];

getSingleMovie.mockResolvedValue({ movie:
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

describe.only("Single Movie", () => {
  it('should render a single movie', async () => {

    render(
      <MemoryRouter>
        <SingleMovie  movieRatings={ratings}/>
      </MemoryRouter>
    );
    // check that there is a container element on the page
    const moviesContainer = screen.getByTitle("single-movie");
    const moviePoster = await waitFor(() => screen.getByAltText('image-poster-backdrop'))
    expect(moviesContainer).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    const movieValues = [
      'Money Plane', 
      'Release Date: 2020-09-29', 
      'Average Rating: 9',
      'Overview: A professional thief with $40 million in debt.', 
      'Genres: Action', 
      'Budget: 0', 
      'Revenue: 0', 
      'Runtime: 82', 
      'They\'re grrreat'
    ]
    
    for (let i = 0; i < movieValues.length; i++) {
      const movieTitle = await waitFor(() => screen.getByText(movieValues[i])) 
      expect(movieTitle).toBeInTheDocument();
    }
  })

    it('Should be able to see the rated movie', async () => {

      const movieID="613504";

      render(
        <MemoryRouter>
          <SingleMovie  movieRatings={ratings} movieID={movieID}/>
        </MemoryRouter>
      )
      expect(screen.getByText("Your Rating: 4")).toBeInTheDocument();
    })


    it('Should show "You Have Not Rated This Movie...Yet" if the movie is not rated', async () => {

      const movieID="8675309";

      render(
        <MemoryRouter>
          <SingleMovie  movieRatings={ratings} movieID={movieID}/>
        </MemoryRouter>
      )
      expect(screen.getByText("You Have Not Rated This Movie...Yet")).toBeInTheDocument();
    })

    it('Should alert the user they are not logged in when attpemting to rate a movie', async () => {

      const userStatus = {};
      const movieID="8675309";
      
      render(
        <MemoryRouter>
          <SingleMovie  movieRatings={ratings} movieID={movieID} userStatus={userStatus}/>
        </MemoryRouter>
      )
      expect(screen.getByText("You Have Not Rated This Movie...Yet")).toBeInTheDocument();
    })
})


