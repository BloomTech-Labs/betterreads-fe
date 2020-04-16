import { SET_CURRENT_BOOK, SET_BREADCRUMBS, FETCH_CURRENT_BOOK } from '../actions/types';

export const initialState = {
	fetchingCurrentBook: false,
	currentBook: {},
	breadcrumbs: [{ label: 'Book details', path: null }]
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CURRENT_BOOK:
			return {
				...state, 
				fetchingCurrentBook: true
			}
		case SET_CURRENT_BOOK:
			return {
				...state,
				fetchingCurrentBook: false,
				currentBook: action.payload
			};

		case SET_BREADCRUMBS:
			return {
				...state,
				fetchingCurrentBook: false,
				breadcrumbs: action.payload
			};

		default:
			return state;
	}
}