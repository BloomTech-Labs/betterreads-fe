import { FETCH_USERS_BOOKS, FETCH_USERS_SHELVES } from '../actions';

const initialState = {
	userBooks: [],
	userShelves: [],
	currentShelf: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_BOOKS:
			return {
				...state,
				userBooks: action.payload
			};

		case FETCH_USERS_SHELVES:
			return {
				...state,
				userShelves: action.payload
			};

		default:
			return state;
	}
}
