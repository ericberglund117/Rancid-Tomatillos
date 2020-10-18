import React from 'react';
import { render, waitFor, screen, getByText, getByPlaceholderText,
  getByAltText, getByRole, getByTitle, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from './Login'
import { MemoryRouter } from 'react-router-dom'
import {getUser} from '../apiCalls'
import { shallow } from 'enzyme';
// import { userEvent } from '@testing-library/user-event'
jest.mock('../apiCalls.js')


describe("Login", () => {
  it('Should see a login input', async () => {
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

  it('Test click event', () => {
    render(
      <MemoryRouter>
        <Login  />
      </MemoryRouter>
    );
    const loginSubmitButton = screen.getByRole('button');
    getUser.mockResolvedValueOnce( { 
      email: "ken@turing.io",
      id: 80,
      name: "Ken"
    })
    fireEvent.click(screen.getByRole('button'), { name:'Submit' })
    expect(loginSubmitButton).toBeInTheDocument();
    expect(getUser).toHaveBeenCalled();
  });

  it('should change input fields when the user is logging in', () => {
    render(
      <MemoryRouter>
        <Login  />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    emailInput.value = "RedSweater1";
    passwordInput.value = "KenBone#1";
    fireEvent.change(emailInput);
    fireEvent.change(passwordInput);
  })
});