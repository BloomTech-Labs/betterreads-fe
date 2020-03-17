import { SET_ERROR, RESET_ERROR } from '../actions';

export const initialState = {
	error: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERROR:
			return {
				...state,
				error: action.payload
			};

		case RESET_ERROR:
			return {
				...state,
				error: ''
			};

		default:
			return state;
	}
};