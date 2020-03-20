import {
    CREATE_USER_SHELF,
    CREATE_USER_SHELF_SUCCESS,
    CREATE_USER_SHELF_FAILURE,
    ADD_BOOK_TO_SHELF, 
    DELETE_BOOK_FROM_SHELF,
    } from '../actions/types'

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER_SHELF:
			return {
				...state,
				userShelves: action.payload
			};
        case CREATE_USER_SHELF_SUCCESS:
            return {
				...state,
				fetching: false,
				currentBook: action.payload
            };
		case CREATE_USER_SHELF_FAILURE:
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
        default:
                return state;
        }

}