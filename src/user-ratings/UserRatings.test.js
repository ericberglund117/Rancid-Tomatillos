import React from 'react';
import Movies from '../movies/Movies.js';
import SingleMovie from '../single-movie/SingleMovie.js'
import { render, waitFor, screen, getByText,
  getByAltText, getByTitle} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
jest.mock('../apiCalls.js')
