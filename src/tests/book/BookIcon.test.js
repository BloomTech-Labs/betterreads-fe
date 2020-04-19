import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookIcon from '../../components/Book/BookIcon';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux'

test('BookIcon Renders', () => {
	renderWithRedux(<BookIcon />);
});

test('SVG Renders', () => {
    const { getByTestId } = renderWithRedux(<BookIcon/>)
    const svg = getByTestId('svg')
    expect(svg).toBeInTheDocument();
})
