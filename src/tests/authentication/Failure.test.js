import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Failure from '../../components/authentication/Failure';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux'

test('Failure Renders', () => {
	renderWithRedux(<Failure />);
});

test('Failure Title Renders', () => {
    const { getByTestId } = renderWithRedux(<Failure/>)
    const title = getByTestId('failure-title')
    expect(title).toBeInTheDocument();
})

test('Go Back Functions Correctly', () => {
    const { getByTestId } = renderWithRedux(<Failure/>)
    const button = getByTestId('button')
    fireEvent.click(button)
    expect(window.location.pathname === '/').toBeTruthy();
})