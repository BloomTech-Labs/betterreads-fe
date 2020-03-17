import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OnboardingQuiz from '../components/OnboardingQuiz';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from '../reducers/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const testStore = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));


function renderWithRedux(
    ui,
    {initialState, store = testStore,} = {},
   
) {           
    return {
      ...render(<Provider store={store}>{ui}</Provider>),
      // adding `store` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      store,
    }
  }

test('OnboardingQuiz renders', () => {
	renderWithRedux(<OnboardingQuiz />);
});

test('onboarding adds a gere to the arry', () => {
    const {queryByLabelText, getByLabelText} = renderWithRedux(
      <OnboardingQuiz />,
     
    );

   let checkedArr = [];
    expect(queryByLabelText(/:art/i)).toBeTruthy();
  
    fireEvent.click(getByLabelText(/:art/i));
  
    expect(checkedArr.length === 1);

    fireEvent.click(getByLabelText(/:art/i));
  
    expect(checkedArr.length === 0);
  });

  test('unchecking takes a gere from the arry', () => {
    const {queryByLabelText, getByLabelText} = renderWithRedux(
      <OnboardingQuiz />,
     
    );

   let checkedArr = [];
    expect(queryByLabelText(/:art/i)).toBeTruthy();
  
    fireEvent.click(getByLabelText(/:art/i));
  
    fireEvent.click(getByLabelText(/:art/i));
  
    expect(checkedArr.length === 0);
  });