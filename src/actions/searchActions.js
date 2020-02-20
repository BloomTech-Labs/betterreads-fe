import axios from 'axios';
const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';

export const FETCH_SEARCH_START = "FETCH_SEARCH_START";
export const FETCH_SEARCH_SUCCESS = "FETCH_SEARCH_SUCCESS";
export const FETCH_SEARCH_FAILURE = "FETCH_SEARCH_FAILURE";

export const getGoogleResults = search => dispatch => {
    dispatch({ type: FETCH_SEARCH_START});
    axios.get(`${apiURL}${search}`)
        .then(results => dispatch({ type: FETCH_SEARCH_SUCCESS, payload: results.data}))
        .catch(err => dispatch({ type: FETCH_SEARCH_FAILURE, payload: err.response}));
}