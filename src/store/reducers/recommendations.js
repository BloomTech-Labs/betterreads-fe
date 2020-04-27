import {
  FETCH_RECOMMEDATIONS_START,
  FETCH_RECOMMEDATIONS_SUCCESS,
  FETCH_RECOMMEDATIONS_FAILURE,
  ADD_RECOMMENDATIONS,
  ADD_BASED_ON,
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
    case ADD_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload,
      };
    case ADD_BASED_ON:
      return {
        ...state,
        basedOn: action.payload,
      };
    case FETCH_RECOMMEDATIONS_SUCCESS:
      return {
        ...state,
        fetchRecommendations: false,
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
