import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';
import { testBook } from '../utils/testingConstants'
//components
import SearchPagination from '../../components/search/SearchPagination';

const searchState = {
  fetching: false,
  fetchMore: false,
  error: '',
  searchResults: {
    books: {
      items: [testBook, testBook],
    },
  },
  query: 'Testing',
};

test('components render', () => {
  renderWithRedux(<SearchPagination />);
});

test('button works', () => {
  const { getByTestId } = renderWithRedux(
    <SearchPagination />, {
      initialState: {
        search: searchState
      }
    }
  );
  const button = getByTestId('boot');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});
