import { SET_CURRENT_BOOK, SET_BREADCRUMBS } from '../actions';

const initialState = {
	currentBook: {},
	breadcrumbs: [{ label: 'Book details', path: null }]
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_BOOK:
			return {
				...state,
				currentBook: action.payload
			};

		case SET_BREADCRUMBS:
			return {
				...state,
				breadcrumbs: action.payload
			};

		default:
			return state;
	}
}