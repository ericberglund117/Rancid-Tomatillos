import React from 'react';
import { render, waitFor, screen, getByText, getByPlaceholderText,
  getByAltText, getByTitle} from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'
import {getUser} from '../apiCalls'
jest.mock('../apiCalls.js')


describe("Login", () => {
  it('A user should be able to login', async () => {
    getUser.mockResolvedValueOnce({ user:
      {
        id: 80,
        name: 'Ken',
        email: 'ken@turing.io',
       },
     })
    render(
      <MemoryRouter>
        <Login  />
      </MemoryRouter>
    );
    // check that there is a container element on the page
    const loginContainer = screen.getByTitle('login-form');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    // check that there are movies on the page
    expect(loginContainer).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    })
})
