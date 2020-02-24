import { 
	FETCH_SEARCH_START, 
	FETCH_SEARCH_SUCCESS, 
	FETCH_SEARCH_FAILURE
} from '../actions';

const initialState = {
	fetching: false,
	error: '',
	searchResults: {},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SEARCH_START:
			return {
				...state,
				fetching: true
			}
		case FETCH_SEARCH_SUCCESS:
			return {
				...state,
				fetching: false,
				searchResults: action.payload
			}
		case FETCH_SEARCH_FAILURE:
			return {
				...state,
				fetching: false,
				error: action.payload
			}
		default:
			return state;
	}
};
