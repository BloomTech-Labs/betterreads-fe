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
	UPDATE_SINGLE_BOOK_FIELD
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const fetchUsersBooks = () => dispatch => {
	axios.get(`${API_URL}/api/${localStorage.getItem('id')}/library`)
        .then(response => dispatch({ type: FETCH_USERS_BOOKS, payload: response.data }))
        .catch(error => console.log(error));
};

export const setCurrentShelf = shelf => dispatch => {
	axios.get(`${API_URL}/api/${localStorage.getItem('id')}/library`)
		.then(response => {
			dispatch({ type: FETCH_USERS_BOOKS, payload: response.data });

			if (shelf === 'allbooks') {
				dispatch({ type: SET_CURRENT_SHELF, payload: response.data });
			} else if (shelf === 'favorites') {
				dispatch({ type: SET_CURRENT_SHELF, payload: response.data.filter(item => item.favorite === true) });
			} else if (shelf === 'toberead') {
				dispatch({ type: SET_CURRENT_SHELF, payload: response.data.filter(item => item.readingStatus === 1) });
			} else if (shelf === 'inprogress') {
				dispatch({ type: SET_CURRENT_SHELF, payload: response.data.filter(item => item.readingStatus === 2) });
			} else if (shelf === 'finished') {
				dispatch({ type: SET_CURRENT_SHELF, payload: response.data.filter(item => item.readingStatus === 3) });
			} else {
				// fetch custom shelf books here
			};
		})
		.catch(error => console.log(error));
};

export const fetchUsersShelves = () => dispatch => {
	axios.get(`${API_URL}/api/booksonshelf/user/${localStorage.getItem('id')}`)
		.then(response => dispatch({ type: FETCH_USERS_SHELVES, payload: response.data }))
		.catch(error => console.log(error));
};

export const updateBookFavorite = bookId => dispatch => {
	dispatch({ type: UPDATE_BOOK_FAVORITE, payload: bookId });
};

export const updateBookReadingStatus = (bookId, status) => dispatch => {
	dispatch({ type: UPDATE_BOOK_READING_STATUS, payload: {bookId, status}})
};

export const updateBookUserRating = (bookId, rating) => dispatch => {
	dispatch({ type: UPDATE_BOOK_USER_RATING, payload: {bookId, rating}})
}

export const updateSingleBookField = (bookId, field, value) => dispatch => {
	dispatch({ type: UPDATE_SINGLE_BOOK_FIELD, payload: {bookId, field, value}})
}

export const addBookToUserLibrary = book => dispatch => {
	dispatch({ type: ADD_BOOK_TO_LIBRARY, payload: book });
};

export const deleteUserBook = googleId => dispatch => {
	dispatch({ type: DELETE_USER_BOOK, payload: googleId });
};

export const moveBookFromShelf = bookId => dispatch => {
	dispatch({ type: MOVE_BOOK_FROM_SHELF, payload: bookId})
};

// fetches shelf's books, release canvas 2, custom shelves
export const fetchShelfsBooks = shelfID => dispatch => {
	axios.get(`${API_URL}/api/shelves/${shelfID}`)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
};

export const createUserShelf = (name, isPrivate) => dispatch => {
	return axios.post(`${API_URL}/api/shelves/user/${localStorage.getItem('id')}`, { shelfName: name, isPrivate: isPrivate });
};