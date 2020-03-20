import {
    CREATE_USER_SHELF,
    CREATE_USER_SHELF_SUCCESS,
    CREATE_USER_SHELF_FAILURE,
    ADD_BOOK_TO_SHELF, 
    DELETE_BOOK_FROM_SHELF,
    } from './types'
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const AddToCustomShelf = (shelfPrivate) => {
	axios.post(`${API_URL}/api/booksonshelf/shelves/:shelfId${props.match.params.id}`, {  isPrivate: shelfPrivate })
		.then(response => dispatch({ type: ADD_BOOK_TO_SHELF, payload: response.data }))
		.catch(error => console.log( error ));
};

export const DeleteFromCustomShelf = (shelfPrivate) => {
	axios.post(`${API_URL}/api/booksonshelf/shelves/:shelfId${props.match.params.id}`, {  isPrivate: shelfPrivate })
		.then(response => dispatch({ type: DELETE_BOOK_FROM_SHELF, payload: response.data }))
		.catch(error => console.log( error ));
};