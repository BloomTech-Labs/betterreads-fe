import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import SignUp from '../../components/authentication/SignUp';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('Renders Signup', () => {
  renderWithRedux(<SignUp />);
});

test('Signup Form Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(<SignUp />);

  //  Input Validation
  const nameInput = getByTestId('name-input');
  expect(nameInput.value).toBe('');
  fireEvent.change(nameInput, { target: { value: 'Testing' } });
  expect(nameInput.value).toBe('Testing');
  const emailInput = getByTestId('email-input');
  expect(emailInput.value).toBe('');
  fireEvent.change(emailInput, { target: { value: 'Testing' } });
  expect(emailInput.value).toBe('Testing');
  const passwordInput = getByTestId('password-input');
  expect(passwordInput.value).toBe('');
  fireEvent.change(passwordInput, { target: { value: 'Testing' } });
  expect(passwordInput.value).toBe('Testing');
  const confirmInput = getByTestId('confirm-input');
  expect(confirmInput.value).toBe('');
  fireEvent.change(confirmInput, { target: { value: 'Testing' } });
  expect(confirmInput.value).toBe('Testing');
  //   Button event firing
  const signUpButton = getByTestId('signup-button');
  expect(signUpButton).toBeInTheDocument();
  fireEvent.click(signUpButton);
});

test('Signup Shows Error Properly', () => {
  const history = createMemoryHistory({});
  const { getByTestId } = renderWithRedux(
    <Router history={history}>
      <SignUp />
    </Router>,
    {
      initialState: {
        authentication: {
          error: 'Error',
        },
      },
    }
  );
  const errorMesage = getByTestId('error-message');
  expect(errorMesage).toBeInTheDocument();
});

test('Redirects to Signup Component', () => {
  const history = createMemoryHistory();
  const { getByTestId } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>
  );

  const signUpRedirect = getByTestId('sign-up-redirect');
  fireEvent.click(signUpRedirect);

  const signInRedirect = getByTestId('sign-in-redirect');
  fireEvent.click(signInRedirect);

  const signInHeading = getByTestId('sign-in-heading');
  expect(signInHeading).toBeInTheDocument();
});
