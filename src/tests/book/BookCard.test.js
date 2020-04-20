import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookCard from '../../components/Book/BookCard';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux';
import { testBook } from '../utils/testingConstants';

test('BookIcon Renders', () => {
  renderWithRedux(<BookCard book={{ googleId: 'e' }} />);
});

test('Something Renders', () => {
  renderWithRedux(
    <BookCard
      book={{ googleId: 'e', userRating: '2.3' }}
      useBooks={[{ googleId: 'e' }]}
      source='search'
    />
  );
});

test('Thumbnail Button Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(
    <BookCard book={{ googleId: 'e' }} />
  );
  const button = getByTestId('thumb-button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(window.location.pathname === '/book/e').toBeTruthy();
});

test('Title Link Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(
    <BookCard book={{ googleId: 'e' }} />
  );
  const link = getByTestId('title-link');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  expect(window.location.pathname === '/book/e').toBeTruthy();
});

test('Title Link Functions Correctly', () => {
  const { getByTestId } = renderWithRedux(
    <BookCard book={{ googleId: 'e', authors: 'Author' }} />
  );
  const link = getByTestId('author-link');
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  expect(window.location.pathname === '/book/e').toBeTruthy();
});
