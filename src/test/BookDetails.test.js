import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import BookDetails from '../components/BookDetails';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer } from '../reducers/Reducer';


const results = {
        
        match:{
          path: "/book/:id",
          url: "/Book/Gz1jn_5OafMC",
          isExact: true,
            params:{
              id: "Gz1jn_5OafMC"}},
        searchResults:{
          items:[
            {
              id: "Gz1jn_5OafMC",
                volumeInfo: {
                title: "Wizard's First Rule",
                authors: [
                    "Terry Goodkind"],
                catagories: [
                    ["Fiction"]],
                imageLinks:[{
                    thumbnail: "http://books.google.com/books/content?id=Gz1jn_5OafMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }],
            
          
                
              }},
               
                  {
                    id: "hn1FNJXPMrUC",
                      volumeInfo: {
                      title: "Confessor",
                      authors: [
                          "Terry Goodkind"],
                      catagories: [
                          ["Fiction"]],
                      imageLinks:[{
                          thumbnail: "http://books.google.com/books/content?id=hn1FNJXPMrUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" }] 
                
                      
                    }}]}};
                    
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const testStore = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));


function renderWithRedux(
    ui,
    {initialState, store = testStore,} = {},
   
) {           
    return {
      ...render(<Provider store={results}>{ui}</Provider>),
      // adding `store` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      store,
    }
  }



test('BookDetails renders', () => {

    

    renderWithRedux(<BookDetails />)
 
    
});