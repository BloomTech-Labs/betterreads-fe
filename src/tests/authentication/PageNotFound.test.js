import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageNotFound from '../../components/authentication/PageNotFound';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('Renders PageNotFound', () => {
  renderWithRedux(<PageNotFound />);
});

test('PageNotFound H1 Renders Correctly', () => {
  const { getByTestId } = renderWithRedux(<PageNotFound />);
  const pageTitle = getByTestId('page-not-found');
  expect(pageTitle).toHaveTextContent('Page not found');
});

test('PageNotFound Button Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(<PageNotFound />);

  //   Button event firing
  const goBackButton = getByTestId('go-back');
  expect(goBackButton).toBeInTheDocument();
  fireEvent.click(goBackButton);
});
