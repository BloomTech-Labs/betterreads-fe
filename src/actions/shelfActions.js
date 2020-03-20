import {
    CREATE_USER_SHELF,
    CREATE_USER_SHELF_SUCCESS,
    CREATE_USER_SHELF_FAILURE,
    FETCH_USER_SHELF,
    FETCH_USER_SHELF_SUCCESS,
    FETCH_USER_SHELF_FAILURE,
    ADD_BOOK_TO_SHELF, 
    DELETE_BOOK_FROM_SHELF,
    } from './types'
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const getUserShelves = () => {
 dispatch({ type: FETCH_USER_SHELF });
	axios.get(`${API_URL}/api/shelves/user/${localStorage.getItem('id')}`)  
        .then(response =>{
            console.log(response)    
            dispatch({ type: FETCH_USER_SHELF_SUCCESS, payload: response.data });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: FETCH_USER_SHELF_FAILURE, payload: error.response });
            });
    };

export const addToCustomShelf = (book) => {
	axios.post(`${API_URL}/api/booksonshelf/shelves/${props.match.params.id}`, {   })
		.then(response => dispatch({ type: ADD_BOOK_TO_SHELF, payload: book }))
		.catch(error => console.log( error ));
};

export const deleteFromCustomShelf = (book) => {
	axios.post(`${API_URL}/api/booksonshelf/shelves/${props.match.params.id}`, {  book: book })
		.then(response => dispatch({ type: DELETE_BOOK_FROM_SHELF, payload: book }))
		.catch(error => console.log( error ));
};