import {
  FETCH_RECOMMEDATIONS_START,
  FETCH_RECOMMEDATIONS_SUCCESS,
  FETCH_RECOMMEDATIONS_FAILURE,
  FETCH_BOOK_RECOMMENDATIONS,
  FETCH_SHELF_RECOMMENDATIONS,
  ADD_RECOMMENDATIONS,
  ADD_BASED_ON,
} from '../actions/types';

export const initialState = {
  fetchRecommendations: false,
  shelfSuccess: false,
  bookSuccess: false,
  error: '',
  recommendations: [],
  shelfRecs: [],
  bookRecs: [],
  basedOn: '',
  temp: [],
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
    case FETCH_SHELF_RECOMMENDATIONS:
      return {
        ...state,
        shelfRecs: action.payload,
        shelfSuccess: true,
      };
    case FETCH_BOOK_RECOMMENDATIONS:
      return {
        ...state,
        bookRecs: action.payload,
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
