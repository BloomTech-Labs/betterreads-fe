import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../components/SignUp';

test('sign up component renders', () => {
	render(<SignUp />);
});

test('header renders', () => {
	const { getByText } = render(<SignUp />);
	const header = getByText(/Create an account to join BetterReads/i);
	expect(header).toBeInTheDocument();
});
