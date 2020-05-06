import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//import component
import { renderWithRedux } from '../utils/renderWithRedux';
import Header from '../../components/Navigation/Header';

test('renders nav with redux', async () => {
  renderWithRedux(<Header />);
});

test('H1 Routes User To Home', () => {
  const { getByTestId } = renderWithRedux(<Header />);
  const h1 = getByTestId('h1-route');
  expect(h1).toBeInTheDocument();
  fireEvent.click(h1);
  expect(window.location.pathname === '/').toBeTruthy();
});

test('Profile Icon Renders', async () => {
  const { getByTestId } = renderWithRedux(<Header />);
  window.localStorage.setItem('image', 'image');
  const dropDown = getByTestId('drop-down-toggle');
  expect(dropDown).toBeInTheDocument();
});

test('Profile Icon Renders DropDown', async () => {
  const { getByTestId } = renderWithRedux(<Header />);
  window.localStorage.setItem('image', 'image');
  const dropDown = getByTestId('drop-down-toggle');
  expect(dropDown).toBeInTheDocument();
  fireEvent.click(dropDown);
  const github = getByTestId('github-opt');
  const signOut = getByTestId('signout-opt');
  expect(github).toBeInTheDocument();
  expect(signOut).toBeInTheDocument();
  fireEvent.click(signOut);
  expect(window.location.pathname === '/').toBeTruthy();
});
