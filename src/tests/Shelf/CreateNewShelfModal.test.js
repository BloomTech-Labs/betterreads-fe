import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateNewShelfModal from '../../components/Shelf/CreateNewShelfModal';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux';
import { testBook } from '../utils/testingConstants';

test('AddToExistingShelf Renders', () => {
  renderWithRedux(<CreateNewShelfModal />);
});

test('AddToExistingShelf Creates Shelf with button', () => {
  const { getByTestId, getByRole, getByText } = renderWithRedux(
    <CreateNewShelfModal />
  );
  const show = getByTestId('show');
  expect(show).toBeInTheDocument();
  fireEvent.click(show);
  const modal = getByRole('document');
  expect(modal).toBeInTheDocument();
  const input = getByTestId('input');
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: '23' } });
  expect(input.value).toBe('23');
  const ok = getByText('OK');
  expect(ok).toBeInTheDocument();
  fireEvent.click(ok);
});
