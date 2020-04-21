import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddToExistingShelf from '../../components/Shelf/AddToExistingShelf';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux';
import { testBook } from '../utils/testingConstants';

test('AddToExistingShelf Renders', () => {
  renderWithRedux(<AddToExistingShelf />);
});
