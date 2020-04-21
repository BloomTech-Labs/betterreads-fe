import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Success from '../../components/authentication/Success';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('Renders PageNotFound', () => {
  renderWithRedux(<Success />);
});

test('Success Container Renders Correctly', () => {
  const { getByTestId } = renderWithRedux(<Success />);
  const pageTitle = getByTestId('success-container');
  expect(pageTitle).toBeInTheDocument();
});

test('Success Spinner Renders Correctly', () => {
  const { getByTestId } = renderWithRedux(<Success />);
  const pageTitle = getByTestId('success-spinner');
  expect(pageTitle).toBeInTheDocument();
});
