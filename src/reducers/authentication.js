import { SET_ERROR, RESET_ERROR } from '../actions';

const initialState = {
	error: ''
};

export default function reducer(state = initialState, action) {
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
}
