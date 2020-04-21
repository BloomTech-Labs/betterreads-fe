import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Shelves from '../../components/library/Shelves';
// Testing Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('Shelves Redners', () => {
  renderWithRedux(<Shelves />);
});
