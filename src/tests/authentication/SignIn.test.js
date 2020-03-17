import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../../reducers';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import SignIn from '../../components/authentication/SignIn';

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	};
};

test('component renders', () => {
    renderWithRedux(<SignIn />);
});

test('redirects to the sign up component', () => {
    const history = createMemoryHistory();
    const { getByTestId } = renderWithRedux(
        <Router history={history}>
            <App />
        </Router>
    );

    const signUpRedirect = getByTestId('sign-up-redirect');    
    fireEvent.click(signUpRedirect);

    const signUpHeading = getByTestId('sign-up-heading');
    expect(signUpHeading).toBeInTheDocument();
});