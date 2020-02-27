import { FETCH_USERS_BOOKS, FETCH_USERS_SHELVES } from '../actions';

const initialState = {
	userLibrary: [],
	userShelves: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_USERS_BOOKS:
			return {
				...state,
				userLibrary: action.payload
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
