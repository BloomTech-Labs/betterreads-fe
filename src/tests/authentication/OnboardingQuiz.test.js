import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OnboardingQuiz from '../../components/authentication/OnboardingQuiz';
// Testing Util
import { renderWithRedux } from '../utils/renderWithRedux'

test('component renders', () => {
	renderWithRedux(<OnboardingQuiz />);
});

test('check a genre', () => {
    const { getByLabelText } = renderWithRedux(<OnboardingQuiz />);
	const artCheckbox = getByLabelText('Art');
	fireEvent.click(artCheckbox);
	expect(artCheckbox).toBeChecked();
});

test('check a genre and submit', () => {
    const { getByLabelText, getByTestId } = renderWithRedux(<OnboardingQuiz />);
	const artCheckbox = getByLabelText('Art');
	fireEvent.click(artCheckbox);
	expect(artCheckbox).toBeChecked();
	const submit = getByTestId('quiz-button');
	fireEvent.click(submit);
});

test('uncheck a genre', () => {
	const { getByLabelText } = renderWithRedux(<OnboardingQuiz />);
	const artCheckbox = getByLabelText('Art');
	fireEvent.click(artCheckbox);
	fireEvent.click(artCheckbox);
	expect(artCheckbox).not.toBeChecked();
});