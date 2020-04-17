import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import SignIn from '../../components/authentication/SignIn';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('SignIn Renders', () => {
  renderWithRedux(<SignIn />);
});

test('Signin Form Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(<SignIn />);

  //  Input Validation
  const emailInput = getByTestId('email-input');
  expect(emailInput.value).toBe('');
  fireEvent.change(emailInput, { target: { value: 'Testing' } });
  expect(emailInput.value).toBe('Testing');
  const passwordInput = getByTestId('password-input');
  expect(passwordInput.value).toBe('');
  fireEvent.change(passwordInput, { target: { value: 'Testing' } });
  expect(passwordInput.value).toBe('Testing');
  //   Button event firing
  const signUpButton = getByTestId('sign-in-button');
  expect(signUpButton).toBeInTheDocument();
  fireEvent.click(signUpButton);
});

test('Signin Shows Error Properly', () => {
  const history = createMemoryHistory({});
  const { getByTestId } = renderWithRedux(
    <Router history={history}>
      <SignIn />
    </Router>,
    {
      initialState: {
        authentication: {
          error: 'Error',
        },
      },
    }
  );
  const errorMesage = getByTestId('error');
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

  const signUpHeading = getByTestId('sign-up-heading');
  expect(signUpHeading).toBeInTheDocument();
});
