import { SET_CURRENT_BOOK, SET_BREADCRUMBS, FETCH_CURRENT_BOOK } from './types';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/search';

export const fetchCurrentBook = (googleID) => (dispatch) => {
  dispatch({ type: FETCH_CURRENT_BOOK });
  axiosWithAuth()
    .post(readrrDSURL, { type: 'googleId', query: googleID })
    .then((book) => {
      console.log('Book: ', book);
      const newBook = book.data.map((book) => {
        return {
          authors: book.authors && book.authors.toString(),
          averageRating: book.averageRating || null,
          categories: (book.categories && book.categories.toString()) || null,
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
      dispatch({ type: SET_CURRENT_BOOK, payload: newBook[0] });
    })
    .catch((error) => console.log(error, 'Here'));
};

export const setBreadcrumbs = (breadcrumbs) => (dispatch) => {
  dispatch({ type: SET_BREADCRUMBS, payload: breadcrumbs });
};
