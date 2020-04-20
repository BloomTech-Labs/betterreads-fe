import React from 'react';
import { cleanup, fireEvent, getAllByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/renderWithRedux';
import Breadcrumbs from '../../components/Navigation/Breadcrumbs';

afterEach(cleanup);

test('breadcrumb wrap renders and functions', () => {
  const { getByTestId } = renderWithRedux(<Breadcrumbs />);
  const Crumbs = getByTestId('bread');
  expect(Crumbs).toBeInTheDocument();
});

test('item 1 is functioning', () => {
  const { getByTestId } = renderWithRedux(<Breadcrumbs />);
  const Item = getByTestId('item1');
  fireEvent.click(Item);
  expect(window.location.pathname === '/').toBeTruthy();
});
