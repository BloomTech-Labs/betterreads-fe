import {
    FETCH_RECOMMEDATIONS_START,
    FETCH_RECOMMEDATIONS_SUCCESS,
    FETCH_RECOMMEDATIONS_FAILURE
} from './types'

import axios from 'axios';
axios.defaults.withCredentials = true;

const readrrDSURL = 'http://ds.readrr.app/recommedations';

export const fetchRecommendations = userId => dispatch => {
    dispatch({ type: FETCH_RECOMMEDATIONS_START });
    axios.post(readrrDSURL, {userId: localStorage.getItem('id')})
        .then(results => dispatch({ type: FETCH_RECOMMEDATIONS_SUCCESS, payload: results.data }))
        .catch(error => dispatch({ type: FETCH_RECOMMEDATIONS_FAILURE, payload: error.response }))
}