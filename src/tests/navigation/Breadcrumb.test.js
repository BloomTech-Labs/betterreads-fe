import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRedux } from '../utils/renderWithRedux';
import Breadcrumbs from '../../components/Navigation/Breadcrumbs';

test('breadcrumb wrap renders and functions', () => {
  const { getByTestId } = renderWithRedux(<Breadcrumbs />);
  const Crumbs = getByTestId('bread');
  expect(Crumbs).toBeInTheDocument();
});

test('BreadCrumb functions with Crumb Props', () => {
  const { getByTestId } = renderWithRedux(<Breadcrumbs />);
  const Item = getByTestId('item1');
  fireEvent.click(Item);
  expect(window.location.pathname === '/home').toBeTruthy();
});

test('BreadCrumb functions with no Props', () => {
  const { getByTestId } = renderWithRedux(
    <Breadcrumbs crumbs={[{ path: '/', label: 'Testing' }]} />
  );
  const Item = getByTestId('prop-item');
  fireEvent.click(Item);
  expect(window.location.pathname === '/home').toBeTruthy();
});

test('BreadCrumb functions with Partial Crumb Props', () => {
  const { getByTestId } = renderWithRedux(
    <Breadcrumbs crumbs={[{ label: 'Testing' }]} />
  );
  const Item = getByTestId('prop-item');
  fireEvent.click(Item);
});
