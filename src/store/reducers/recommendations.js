import {
  FETCH_RECOMMEDATIONS_START,
  FETCH_RECOMMEDATIONS_SUCCESS,
  FETCH_RECOMMEDATIONS_FAILURE,
} from '../actions/types';

export const initialState = {
  fetchRecommendations: false,
  error: '',
  recommendations: [],
  basedOn: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECOMMEDATIONS_START:
      return {
        ...state,
        fetchRecommendations: true,
      };
    case FETCH_RECOMMEDATIONS_SUCCESS:
      return {
        ...state,
        fetchRecommendations: false,
        basedOn: action.payload.basedOn,
        recommendations: action.payload.books,
      };
    case FETCH_RECOMMEDATIONS_FAILURE:
      return {
        ...state,
        fetchRecommendations: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
