import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from '../components/SignIn';

test('sign in component renders', () => {
	render(<SignIn />);
});

test('header renders', () => {
	const { getByText } = render(<SignIn />);
	const header = getByText(/Sign in to BetterReads/i);
	expect(header).toBeInTheDocument();
});
