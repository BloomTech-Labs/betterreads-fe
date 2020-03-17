import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import { render } from '@testing-library/react';
import Search from '../../components/search/Search';

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	};
};

test('component renders', () => {
	renderWithRedux(<Search /> );
});