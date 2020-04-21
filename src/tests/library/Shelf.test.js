import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Shelf from '../../components/library/Shelf';
// Testing Utils
import { renderWithRedux } from '../utils/renderWithRedux';
import { testShelf } from '../utils/testingConstants';

const shelfParam = { params: 'TEST' };

test('Shelf Renders', () => {
  renderWithRedux(<Shelf match={shelfParam} />);
});

test('Shelf Container Renders', () => {
  renderWithRedux(<Shelf match={shelfParam} currentShelf={testShelf} />);
});
