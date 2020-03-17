import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from '../../reducers/authentication';
import { render, fireEvent, waitFor, waitForDomChange } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignIn from '../../components/authentication/SignIn';

const renderWithRedux = (component, { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store
	};
};

test('component renders', () => {
    renderWithRedux(<SignIn />, {
        initialState: {
            authentication: initialState
        }
    });
});

test('hope this works', async () => {
    const { debug, getByTestId } = renderWithRedux(<SignIn />, {
        initialState: {
            authentication: initialState
        }
    });
    
    const emailAddressInput = getByTestId('email-address-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.change(emailAddressInput, { target: { value: 'email@address' }});
    fireEvent.change(passwordInput, { target: { value: 'password' }});
    fireEvent.click(signInButton);
    
    await waitFor(() => {
        expect(getByTestId('error'));
    });
    debug();
});