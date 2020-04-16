import { FETCH_SEARCH_START, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE, CLEAR_SEARCH_RESULTS, SET_QUERY, LOAD_MORE, FETCH_LOAD_MORE } from '../actions/types';

export const initialState = {
	fetching: false,
	fetchMore: false,
	error: '',
	searchResults: {},
	query: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SEARCH_START:
			return {
				...state,
				fetching: true
			};
			
		case FETCH_SEARCH_SUCCESS:
			return {
				...state,
				fetching: false,
				searchResults: action.payload
			};

		case FETCH_SEARCH_FAILURE:
			return {
				...state,
				fetching: false,
				error: action.payload
			};

		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				fetching: false,
				searchResults: {}
			};

		case SET_QUERY:
			return {
				...state,
				query: action.payload
			};

		case FETCH_LOAD_MORE: 
			return {
				...state,
				fetchMore: true
			}

		case LOAD_MORE:
			return {
				...state,
				fetchMore: false,
				searchResults: {
					books: {
						...state.searchResults.books,
						items: [
							...state.searchResults.books.items,
							...action.payload
						]
					}
				}
			};
		default:
			return state;
	}
}
