import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookCardList from '../../components/Book/BookCardList';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux'

test('BookIcon Renders', () => {
	renderWithRedux(<BookCardList />);
});