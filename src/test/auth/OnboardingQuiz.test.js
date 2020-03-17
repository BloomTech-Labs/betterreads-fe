import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OnboardingQuiz from '../../components/authentication/OnboardingQuiz';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducer from '../../reducers';

const testStore = createStore(combineReducer, applyMiddleware(thunk, logger));

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
    const {getByTestId} = renderWithRedux(
      <OnboardingQuiz />,
     
    );
  
   let checkedArr = [];
    
   fireEvent.click(getByTestId('genre test id 0'));
  
    expect(checkedArr.length === 1);

    fireEvent.click(getByTestId('genre test id 0'));
  
    expect(checkedArr.length === 0);
  });

  test('unchecking takes a gere from the arry', () => {
    const {getByTestId} = renderWithRedux(
      <OnboardingQuiz />,
     
    );
   
   let checkedArr = [];
     
   fireEvent.click(getByTestId('genre test id 0'));
  
   fireEvent.click(getByTestId('genre test id 0'));
  
    expect(checkedArr.length === 0);
  });