import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookCardList from '../../components/Book/BookCardList';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux';

test('BookCardList Renders', () => {
  renderWithRedux(<BookCardList />);
});

test('BookCardListContainer ShelfName Div Renders', () => {
  const { getByTestId } = renderWithRedux(<BookCardList label='Test' />);
  const shelfNameDiv = getByTestId('shelf-name-div');
  expect(shelfNameDiv).toBeInTheDocument();
});

test('BookCardListContainer ShelfName Div Renders', () => {
  const { getByTestId } = renderWithRedux(<BookCardList label='My books' />);
  const shelfNameDiv = getByTestId('my-book-shelf-name');
  expect(shelfNameDiv).toBeInTheDocument();
});

test('BookCardListContainer Edit Form Does Not Render', () => {
  const { getByTestId } = renderWithRedux(<BookCardList label='Test' />);
  const editH2 = getByTestId('edit-h2');
  expect(editH2).toBeInTheDocument();
});

test('BookCardListContainer Edit Form Renders When Clicking H2', () => {
  const { getByTestId } = renderWithRedux(<BookCardList label='Test' />);
  const editH2 = getByTestId('edit-h2');
  expect(editH2).toBeInTheDocument();
  fireEvent.click(editH2);
  const editForm = getByTestId('edit-form');
  expect(editForm).toBeInTheDocument();
});

test('BookCardListContainer Edit Form Renders When Clicking FontAwesome Icon', () => {
  const { getByTestId } = renderWithRedux(<BookCardList label='Test' />);
  const editIcon = getByTestId('edit-icon');
  expect(editIcon).toBeInTheDocument();
  fireEvent.click(editIcon);
  const editForm = getByTestId('edit-form');
  expect(editForm).toBeInTheDocument();
});
