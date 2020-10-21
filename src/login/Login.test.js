import React from 'react';
import { render, waitFor, screen, getByText, getByPlaceholderText,
  getByAltText, getByRole, getByTitle, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { getUser } from '../apiCalls';
jest.mock('../apiCalls.js');

const user = {
  email: "ken@turing.io",
  id: 80,
  name: "Ken"
}
const mockSetUser = jest.fn()

describe("Login", () => {
  it('Should see a login input', async () => {
    render(
      <MemoryRouter>
        <Login  setUser={mockSetUser} userId={user.id} />
      </MemoryRouter>
    );
  
    const loginContainer = screen.getByTitle('login-form');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(loginContainer).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    })

  it('Test click event', () => {
    getUser.mockResolvedValueOnce(user)
    render(
      <MemoryRouter>
        <Login  setUser={mockSetUser} userId={user.id} />
      </MemoryRouter>
    );
    const loginSubmitButton = screen.getByRole('button');
    fireEvent.click(screen.getByRole('button'), { name:'Submit' })
    expect(loginSubmitButton).toBeInTheDocument();
    expect(getUser).toHaveBeenCalled();
  });

  it('should change input fields when the user is logging in', () => {
    render(
      <MemoryRouter>
        <Login  setUser={mockSetUser} userId={user.id} />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    emailInput.value = "RedSweater1";
    passwordInput.value = "KenBone#1";
    fireEvent.change(emailInput);
    fireEvent.change(passwordInput);
  })

  it('Should clear input fields after a user has logged in', () => {
    render(
      <MemoryRouter>
        <Login setUser={mockSetUser} userId={user.id} />
      </MemoryRouter>
    );
    const loginSubmitButton = screen.getByRole('button');
    getUser.mockResolvedValueOnce(user)
    fireEvent.click(screen.getByRole('button'), { name:'Submit' })
    expect(loginSubmitButton).toBeInTheDocument();
    expect(getUser).toHaveBeenCalled();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    emailInput.value = "";
    passwordInput.value = "";
    fireEvent.change(emailInput);
    fireEvent.change(passwordInput);
  })
});
