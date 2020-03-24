import {
    FETCH_USER_SHELF,
    FETCH_USER_SHELF_SUCCESS,
    FETCH_USER_SHELF_FAILURE,
    ADD_BOOK_TO_SHELF, 
	DELETE_BOOK_FROM_SHELF,
	FETCH_USER_BOOKS_ON_SHELVES,
	FETCH_USER_BOOKS_ON_SHELVES_SUCCESS,
	FETCH_USER_BOOKS_ON_SHELVES_FAILURE
    } from '../actions/types'

	export const initialState = {
		fetching: false,
		error: '',
		userShelves: [],
		userBooksOnShelves: []
		
	};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_SHELF:
			return {
				...state,
				fetching: true
			};
        case FETCH_USER_SHELF_SUCCESS:
            return {
				...state,
				fetching: false,
				userShelves: action.payload
            };
		case FETCH_USER_SHELF_FAILURE:
			return {
				...state,
				fetching: false,
				error: action.payload
            };
        case ADD_BOOK_TO_SHELF:
			return {
				...state,
				userShelves: [...state.userShelves, action.payload]
            };
        case DELETE_BOOK_FROM_SHELF:
            return {
				...state,
				userShelves: [...state.userShelves.filter(b => b.bookId !== action.payload)]
			};
		case FETCH_USER_BOOKS_ON_SHELVES:
			return {
				...state,
				fetching: true
			};
		case FETCH_USER_BOOKS_ON_SHELVES_SUCCESS:
			return {
				...state,
				fetching: false,
				userBooksOnShelves: action.payload
			};
		case FETCH_USER_BOOKS_ON_SHELVES_FAILURE:
			return {
				...state,
				fetching: false,
				error: action.payload
			};
        default:
                return state;
        }

}