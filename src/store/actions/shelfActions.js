import {
  FETCH_USER_SHELF,
  FETCH_USER_SHELF_SUCCESS,
  FETCH_USER_SHELF_FAILURE,
  ADD_BOOK_TO_SHELF,
  DELETE_BOOK_FROM_SHELF,
  FETCH_USER_BOOKS_ON_SHELVES,
  FETCH_USER_BOOKS_ON_SHELVES_SUCCESS,
  FETCH_USER_BOOKS_ON_SHELVES_FAILURE,
} from './types';

import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { user } from '../../utils/helpers';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const getUserShelves = () => (dispatch) => {
  dispatch({ type: FETCH_USER_SHELF });
  axiosWithAuth()
    .get(`${API_URL}/api/shelves/user/${user.subject}`)
    .then((response) => {
      dispatch({ type: FETCH_USER_SHELF_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: FETCH_USER_SHELF_FAILURE, payload: error.response });
    });
};

export const addToCustomShelf = (book, shelfId, favorite, readingStatus) => (
  dispatch
) => {
    axiosWithAuth()
    .post(`${API_URL}/api/booksonshelf/shelves/${shelfId}`, { book: book })
    .then((response) => dispatch({ type: ADD_BOOK_TO_SHELF, payload: book }))
    .catch((error) => console.log(error));
};

export const deleteFromCustomShelf = (bookId, shelfId) => (dispatch) => {
    axiosWithAuth()
    .delete(`${API_URL}/api/booksonshelf/shelves/${shelfId}`, {
      data: { bookId },
    })
    .then((response) =>
      dispatch({ type: DELETE_BOOK_FROM_SHELF, payload: response })
    )
    .catch((error) => console.log(error));
};

export const getBooksOnShelves = () => (dispatch) => {
  dispatch({ type: FETCH_USER_BOOKS_ON_SHELVES });
  axiosWithAuth()
    .get(
      `${API_URL}/api/booksonshelf/user/${user.subject}/shelves/allbooks`
    )
    .then((response) => {
      dispatch({
        type: FETCH_USER_BOOKS_ON_SHELVES_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_USER_BOOKS_ON_SHELVES_FAILURE,
        payload: error.response,
      });
    });
};
