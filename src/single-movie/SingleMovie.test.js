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
    const ratings = [{
      created_at: "2020-10-15T21:31:06.428Z",
      id: 2887,
      movie_id: 613504,
      rating: 4,
      updated_at: "2020-10-15T21:31:06.428Z",
      user_id: 80
    }]
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
        <SingleMovie  movieRatings={ratings}/>
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

    it('Should be able to see the rated movie', async () => {
      
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
          <SingleMovie  movieRatings={ratings} movieID={movieID}/>
        </MemoryRouter>
      )
      expect(screen.getByText("Your Rating: 4")).toBeInTheDocument();
      // rateMovie()
    })


    it('Should show "You Have Not Rated This Movie...Yet" if the movie is not rated', async () => {
      
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

      const ratings = [{
        created_at: "2020-10-15T21:31:06.428Z",
        id: 2887,
        movie_id: 613504,
        rating: 4,
        updated_at: "2020-10-15T21:31:06.428Z",
        user_id: 80
      }]
      const movieID="8675309";

      render(
        <MemoryRouter>
          <SingleMovie  movieRatings={ratings} movieID={movieID}/>
        </MemoryRouter>
      )
      expect(screen.getByText("You Have Not Rated This Movie...Yet")).toBeInTheDocument();
    })

    it('Should alert the user they are not logged in when attpemting to rate a movie', async () => {
     
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
       });
       
      const userStatus = {};
      const movieID="8675309";
      const ratings = [{
        created_at: "2020-10-15T21:31:06.428Z",
        id: 2887,
        movie_id: 613504,
        rating: 4,
        updated_at: "2020-10-15T21:31:06.428Z",
        user_id: 80
      }];
      
      render(
        <MemoryRouter>
          <SingleMovie  movieRatings={ratings} movieID={movieID} userStatus={userStatus}/>
        </MemoryRouter>
      )
      expect(screen.getByText("You Have Not Rated This Movie...Yet")).toBeInTheDocument();
    })
})


