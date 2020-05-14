import {
  SET_TOKEN,
  SET_USER,
  SET_ERROR,
  RESET_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_MESSAGE,
} from '../actions/types';

export const initialState = {
  error: '',
  token: '',
  user: {},
  resetError: false,
  resetMessage: '',
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
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetError: action.payload,
      };
    case RESET_PASSWORD_MESSAGE:
      return {
        ...state,
        resetMessage: action.payload,
      };
    default:
      return state;
  }
};
