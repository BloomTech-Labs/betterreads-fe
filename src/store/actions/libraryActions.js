import {
  FETCH_USERS_BOOKS,
  SET_CURRENT_SHELF,
  FETCH_USERS_SHELVES,
  UPDATE_BOOK_FAVORITE,
  UPDATE_BOOK_READING_STATUS,
  UPDATE_BOOK_USER_RATING,
  ADD_BOOK_TO_LIBRARY,
  DELETE_USER_BOOK,
  MOVE_BOOK_FROM_SHELF,
  UPDATE_SINGLE_BOOK_FIELD,
} from './types';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const fetchUsersBooks = () => (dispatch, getState) => {
  const state = getState();
  const userID = state.authentication.user.subject;
  axiosWithAuth()
    .get(`${API_URL}/api/${userID}/library`)
    .then((response) => {
      dispatch({ type: FETCH_USERS_BOOKS, payload: response.data });
    })
    .catch((error) => console.log(error));
};

export const updateShelves = () => (dispatch, getState) => {
  const state = getState();
  const oldUserBooks = state.library.userBooks;
  dispatch({ type: FETCH_USERS_BOOKS, payload: oldUserBooks });
};

export const setCurrentShelf = (shelf) => (dispatch, getState) => {
  const state = getState();
  const userID = state.authentication.user.subject;
  axiosWithAuth()
    .get(`${API_URL}/api/${userID}/library`)
    .then((response) => {
      dispatch({ type: FETCH_USERS_BOOKS, payload: response.data });

      if (shelf === 'mybooks') {
        dispatch({
          type: SET_CURRENT_SHELF,
          payload: { name: 'My books', books: response.data },
        });
      } else if (shelf === 'favorites') {
        dispatch({
          type: SET_CURRENT_SHELF,
          payload: {
            name: 'Favorites',
            books: response.data.filter((item) => item.favorite === true),
          },
        });
      } else if (shelf === 'toberead') {
        dispatch({
          type: SET_CURRENT_SHELF,
          payload: {
            name: 'To be read',
            books: response.data.filter((item) => item.readingStatus === 1),
          },
        });
      } else if (shelf === 'inprogress') {
        dispatch({
          type: SET_CURRENT_SHELF,
          payload: {
            name: 'Reading',
            books: response.data.filter((item) => item.readingStatus === 2),
          },
        });
      } else if (shelf === 'finished') {
        dispatch({
          type: SET_CURRENT_SHELF,
          payload: {
            name: 'Finished',
            books: response.data.filter((item) => item.readingStatus === 3),
          },
        });
      } else {
        axiosWithAuth()
          .get(
            `${API_URL}/api/booksonshelf/user/${userID}/shelves/${shelf}/allbooks`
          )
          .then((res) =>
            dispatch({
              type: SET_CURRENT_SHELF,
              payload: {
                id: res.data.shelfId,
                name: res.data.shelfName,
                books: res.data.books,
              },
            })
          )
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
};

export const fetchUsersShelves = () => (dispatch, getState) => {
  const state = getState();
  const userID = state.authentication.user.subject;
  axiosWithAuth()
    .get(`${API_URL}/api/booksonshelf/user/${userID}/shelves/allbooks`)
    .then((response) => {
      console.log('Fetch Shelves: ', response.data);
      dispatch({ type: FETCH_USERS_SHELVES, payload: response.data });
    })
    .catch((error) => console.log('Fetch Shelves Error: ', error));
};

export const updateBookFavorite = (bookId) => (dispatch) => {
  dispatch({ type: UPDATE_BOOK_FAVORITE, payload: bookId });
};

export const updateBookReadingStatus = (bookId, status) => (dispatch) => {
  dispatch({ type: UPDATE_BOOK_READING_STATUS, payload: { bookId, status } });
};

export const updateBookUserRating = (bookId, rating) => (dispatch) => {
  dispatch({ type: UPDATE_BOOK_USER_RATING, payload: { bookId, rating } });
};

export const updateSingleBookField = (bookId, field, value) => (dispatch) => {
  dispatch({
    type: UPDATE_SINGLE_BOOK_FIELD,
    payload: { bookId, field, value },
  });
};

export const addBookToUserLibrary = (book) => (dispatch) => {
  dispatch({ type: ADD_BOOK_TO_LIBRARY, payload: book });
};

export const deleteUserBook = (googleId) => (dispatch) => {
  dispatch({ type: DELETE_USER_BOOK, payload: googleId });
};

export const moveBookFromShelf = (bookId) => (dispatch) => {
  dispatch({ type: MOVE_BOOK_FROM_SHELF, payload: bookId });
};

export const createUserShelf = (name, isPrivate) => (dispatch, getState) => {
  const state = getState();
  const userID = state.authentication.user.subject;
  return axiosWithAuth().post(`${API_URL}/api/shelves/user/${userID}`, {
    shelfName: name,
    isPrivate: isPrivate,
  });
};

export const editShelfName = (shelfID, shelfName) => (dispatch) => {
  axiosWithAuth()
    .put(`${API_URL}/api/shelves/${shelfID}`, {
      shelfName: shelfName,
      isPrivate: null,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const deleteShelf = (shelfID, history) => (dispatch) => {
  axiosWithAuth()
    .delete(`${API_URL}/api/shelves/${shelfID}`)
    .then((response) => {
      console.log(response);
      history.push('/myshelves');
    })
    .catch((error) => console.log(error));
};
