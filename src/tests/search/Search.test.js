import React from 'react';
import Search from '../../components/search/Search';
import ShelfNote from '../../components/Shelf/ShelfNote';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('component renders', () => {
  renderWithRedux(<Search />);
});

test('ShelfNote renders in component', () => {
  renderWithRedux(<ShelfNote />);
});
