import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/renderWithRedux';
import SearchForm from '../../components/search/SearchForm';

test('renders properly', () => {
  renderWithRedux(<SearchForm />);
});

test('search event works', () => {
  const { getByTestId } = renderWithRedux(<SearchForm />);
  const input = getByTestId('input1');
  expect(input).toBeInTheDocument();
  expect(input.value).toBe('');
  fireEvent.change(input, {
    target: {
      value: 'testing',
    },
  });
  expect(input.value).toBe('testing');
  fireEvent.click(input);
  fireEvent.keyPress(input, {
    key: 'Enter',
    code: 'Enter',
  });
  expect(input.value).toBe('testing');
});
