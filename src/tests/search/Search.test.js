import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../store/reducers';
import { render } from '@testing-library/react';
import Search from '../../components/search/Search';
import thunk from 'redux-thunk';

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk))} = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	};
};

test('component renders', () => {
	renderWithRedux(<Search /> );
});