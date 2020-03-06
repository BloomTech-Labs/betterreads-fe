import {
    ADD_BOOK_TO_LIBRARY_START,
    ADD_BOOK_TO_LIBRARY_SUCCESS,
    ADD_BOOK_TO_LIBRARY_FAILURE,
    ADD_BOOK_TO_FAVORITE_SUCCESS,
    ADD_BOOK_TO_FAVORITE_FAILURE,
    ADD_BOOK_STATUS_SUCCESS,
    ADD_BOOK_STATUS_FAILURE
} from '../actions'

const initialState = {
    adding: false,
    error: null,
    action: null,
    result: null
}

export default function reducer(state = initialState, action) {
    switch (action.state) {
        case ADD_BOOK_TO_LIBRARY_START:
            return {
                ...state,
                adding: true
            }
        case ADD_BOOK_TO_LIBRARY_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case ADD_BOOK_TO_LIBRARY_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }
        case ADD_BOOK_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case ADD_BOOK_TO_FAVORITE_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }
        case ADD_BOOK_STATUS_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case ADD_BOOK_STATUS_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload
            }
        default:
            return state;
    }
}