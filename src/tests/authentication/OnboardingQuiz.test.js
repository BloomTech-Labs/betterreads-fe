import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OnboardingQuiz from '../../components/authentication/OnboardingQuiz';

const renderWithRedux = (ui, { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}) => {    
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		store
	};
};

test('component renders', () => {
	renderWithRedux(<OnboardingQuiz />);
});

test('check a genre', () => {
    const { getByLabelText } = renderWithRedux(<OnboardingQuiz />);
	const artCheckbox = getByLabelText('Art');
	fireEvent.click(artCheckbox);
	expect(artCheckbox).toBeChecked();
});

test('uncheck a genre', () => {
	const { getByLabelText } = renderWithRedux(<OnboardingQuiz />);
	const artCheckbox = getByLabelText('Art');
	fireEvent.click(artCheckbox);
	fireEvent.click(artCheckbox);
	expect(artCheckbox).not.toBeChecked();
});