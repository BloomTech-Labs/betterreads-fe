import {
    FETCH_USER_SHELF,
    FETCH_USER_SHELF_SUCCESS,
    FETCH_USER_SHELF_FAILURE,
    ADD_BOOK_TO_SHELF, 
    DELETE_BOOK_FROM_SHELF,
    FETCH_USER_BOOKS_ON_SHELVES,
    FETCH_USER_BOOKS_ON_SHELVES_SUCCESS,
    FETCH_USER_BOOKS_ON_SHELVES_FAILURE
    } from './types'
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const getUserShelves = () => dispatch => {
  dispatch({ type: FETCH_USER_SHELF })
    axios.get(`${API_URL}/api/shelves/user/${localStorage.getItem('id')}`)  
        .then(response =>{dispatch({ type: FETCH_USER_SHELF_SUCCESS, payload: response.data });})
            .catch(error => {dispatch({ type: FETCH_USER_SHELF_FAILURE, payload: error.response });});
    };

export const addToCustomShelf = (book, shelfId, favorite, readingStatus) => dispatch => {
	axios.post(`${API_URL}/api/booksonshelf/shelves/${shelfId}`, { book: book  })
		.then(response => dispatch({ type: ADD_BOOK_TO_SHELF, payload: book }))
		.catch(error => console.log(error));
};

export const deleteFromCustomShelf = (bookId, shelfId) => dispatch => {
	axios.delete(`${API_URL}/api/booksonshelf/shelves/${shelfId}`, { data: {bookId} })
		.then(response => dispatch({ type: DELETE_BOOK_FROM_SHELF, payload: response }))
		.catch(error => console.log(error));
};

export const getBooksOnShelves = () => dispatch => {
    dispatch({ type: FETCH_USER_BOOKS_ON_SHELVES })
    axios.get(`${API_URL}/api/booksonshelf/user/${localStorage.getItem('id')}/shelves/allbooks`)  
        .then(response =>{dispatch({ type: FETCH_USER_BOOKS_ON_SHELVES_SUCCESS, payload: response.data });})
            .catch(error => {dispatch({ type: FETCH_USER_BOOKS_ON_SHELVES_FAILURE, payload: error.response });});
};