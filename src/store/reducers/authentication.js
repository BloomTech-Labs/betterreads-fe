import { SET_TOKEN, SET_USER, SET_ERROR, RESET_ERROR } from '../actions/types';

export const initialState = {
  error: '',
  token: '',
  user: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case RESET_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
};
