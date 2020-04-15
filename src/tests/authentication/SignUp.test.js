import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../../store/reducers';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../App';
import SignUp from '../../components/authentication/SignUp';

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	};
};

test('component renders', () => {
    renderWithRedux(<SignUp />);
});

test('redirects to the sign in component', () => {
    const history = createMemoryHistory();
    const { getByTestId, debug } = renderWithRedux(
        <Router history={history}>
            <App />
        </Router>
    );

    const signUpRedirect = getByTestId('sign-up-redirect');    
    fireEvent.click(signUpRedirect);
    
    const signInRedirect = getByTestId('sign-in-redirect');    
    fireEvent.click(signInRedirect);

    const signInHeading = getByTestId('sign-in-heading');
    expect(signInHeading).toBeInTheDocument();
});