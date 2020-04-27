import {
  FETCH_RECOMMEDATIONS_START,
  FETCH_RECOMMEDATIONS_SUCCESS,
  FETCH_RECOMMEDATIONS_FAILURE,
} from './types';

import { axiosWithAuth } from '../../utils/axiosWithAuth';

const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/recommendations';
const test = process.env.REACT_APP_DS_RECS || 'https://api.readrr.app/api/';

export const fetchRecommendations = () => (dispatch, getState) => {
  dispatch({ type: FETCH_RECOMMEDATIONS_START });
  const state = getState();
  const userID = state.authentication.user.subject;
  axiosWithAuth()
    .get(test + `${userID}/recommendations`)
    .then((response) => {
      console.log(response.data);
      const newBookArray = response.data.recommendations.recommendations.map(
        (book) => {
          return {
            authors: book.authors && book.authors.toString(),
            averageRating: book.averageRating || null,
            categories: book.categories || null,
            description: book.description || null,
            googleId: book.googleId,
            isEbook: book.isEbook || null,
            isbn10: book.isbn10 || null,
            isbn13: book.isbn13 || null,
            language: book.language || null,
            pageCount: book.pageCount || null,
            publishedDate: book.publishedDate || null,
            publisher: book.publisher || null,
            smallThumbnail: book.smallThumbnail
              ? book.smallThumbnail.replace('http://', 'https://')
              : null,
            textSnippet: book.textSnippet || null,
            title: book.title || null,
            thumbnail: book.thumbnail
              ? book.thumbnail.replace('http://', 'https://')
              : null,
            webReaderLink: book.webReaderLink || null,
          };
        }
      );
      console.log('New Book Array: ', newBookArray);
      dispatch({
        type: FETCH_RECOMMEDATIONS_SUCCESS,
        payload: {
          basedOn: response.data.recommendations.based_on,
          books: newBookArray,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: FETCH_RECOMMEDATIONS_FAILURE, payload: error.response });
    });
};
