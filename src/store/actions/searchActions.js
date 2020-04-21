import {
  FETCH_SEARCH_START,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_FAILURE,
  LOAD_MORE,
  FETCH_LOAD_MORE,
  CLEAR_SEARCH_RESULTS,
  SET_QUERY,
} from './types';

import { axiosWithAuth } from '../../utils/axiosWithAuth';

//const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/search';

export const getGoogleResults = (search, type) => (dispatch) => {
  dispatch({ type: FETCH_SEARCH_START });
  axiosWithAuth()
    .post(`${readrrDSURL}`, { type: 'search', query: search })
    .then((response) => {
      const newBookArray = response.data.items.map((book) => {
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
        type: FETCH_SEARCH_SUCCESS,
        payload: {
          books: { totalItems: response.data.totalItems, items: newBookArray },
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: FETCH_SEARCH_FAILURE, payload: error.response });
    });
};

export const loadMore = (query, offset) => (dispatch) => {
  dispatch({ type: FETCH_LOAD_MORE });
  axiosWithAuth()
    .post(`${readrrDSURL}`, { type: 'search', query, startIndex: offset })
    .then((response) => {
      const newBookArray = response.data.items.map((book) => {
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
      dispatch({ type: LOAD_MORE, payload: newBookArray });
    })
    .catch((error) =>
      dispatch({ type: FETCH_SEARCH_FAILURE, payload: error.response })
    );
};

export const clearSearchResults = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_RESULTS, payload: '' });
};

export const setQuery = (input) => (dispatch) => {
  dispatch({ type: SET_QUERY, payload: input });
};
