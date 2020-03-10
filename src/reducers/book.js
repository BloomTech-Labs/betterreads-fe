import { FETCH_CURRENT_BOOK, SET_CURRENT_BOOK } from '../actions';

const initialState = {
currentBook: {}

};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_BOOK:
			return {
				...state,
				currentBook: action.payload
			};
		default:
			return state;
	}
}