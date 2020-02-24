import axios from 'axios';
const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const apiLocal = 'http://localhost:5000/api';

export const FETCH_SEARCH_START = "FETCH_SEARCH_START";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_FAILURE = "FETCH_SEARCH_FAILURE";
export const SENDING_BOOK_LIBRARY = "SENDING_BOOK_LIBRARY";
export const SENDING_BOOK_LIBRARY_SUCCESS = "SENDING_BOOK_LIBRARY_SUCCESS";
export const SENDING_BOOK_LIBRARY_FAILURE = "SENDING_BOOK_LIBRARY_FAILURE";

export const getGoogleResults = search => dispatch => {
    dispatch({ type: FETCH_SEARCH_START});
    axios.get(`${apiURL}${search}`)
        .then(results => dispatch({ type: FETCH_SEARCH_SUCCESS, payload: results.data}))
        .catch(err => dispatch({ type: FETCH_SEARCH_FAILURE, payload: err.response}));
}

export const saveBookToLibrary = (userId, bookId, book) => dispatch => {
    dispatch({ type: SENDING_BOOK_LIBRARY});
    // axios.post(`${apiLocal}/${userId}/library/${bookId}`, book)
    //     .then(results => dispatch({ type: SENDING_BOOK_LIBRARY_SUCCESS, payload: results.data}))
    //     .catch(err => dispatch({ type: SENDING_BOOK_LIBRARY_FAILURE, payload: err.response }))
    axios.post(`${apiLocal}/${userId}/library/${bookId}`, book)
        .then(results => console.log(results))
        .catch(err => console.log(err.response))
}