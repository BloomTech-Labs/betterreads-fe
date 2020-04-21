import {
  FETCH_RECOMMEDATIONS_START,
  FETCH_RECOMMEDATIONS_SUCCESS,
  FETCH_RECOMMEDATIONS_FAILURE,
} from './types';

import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { user } from '../../utils/helpers';

const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/recommendations';

export const fetchRecommendations = () => (dispatch) => {
  dispatch({ type: FETCH_RECOMMEDATIONS_START });
  axiosWithAuth()
    .post(readrrDSURL, { userid: user.subject })
    .then((response) => {
      const newBookArray = response.data.recommendations.map((book) => {
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
      });
      dispatch({
        type: FETCH_RECOMMEDATIONS_SUCCESS,
        payload: { interest: response.data.interest, books: newBookArray },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: FETCH_RECOMMEDATIONS_FAILURE, payload: error.response });
    });
};
