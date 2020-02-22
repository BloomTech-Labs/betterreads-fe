import React from 'react';
import { render } from '@testing-library/react';

import Search from '../components/search/Search';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from '../reducers/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const testStore = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));

function renderWithRedux(
    ui,
    {initialState, store = testStore} = {},
  ) {
    return {
      ...render(<Provider store={store}>{ui}</Provider>),
      // adding `store` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      store,
    }
  }

test('Search renders', () => {
    renderWithRedux(<Search />)
    const { getAllByRole } = renderWithRedux(<Search />);
    const buttons = getAllByRole(/button/i);
});