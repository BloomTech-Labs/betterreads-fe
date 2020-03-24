import {
    FETCH_SEARCH_START,
    FETCH_SEARCH_SUCCESS,
    FETCH_SEARCH_FAILURE,
	LOAD_MORE,
	FETCH_LOAD_MORE,
    CLEAR_SEARCH_RESULTS,
    SET_QUERY
} from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const readrrDSURL = 'https://ds.readrr.app/search';

export const getGoogleResults = search => dispatch => {
	dispatch({ type: FETCH_SEARCH_START });
	axios.get(`${googleBooksURL}?q=${search}`)
	//axios.post(`${readrrDSURL}`, {type: 'search', query: search})
		.then(response =>{
			const newBookArray = response.data.items.map(book => {
				return {
					googleId: book.id,
					title: book.volumeInfo.title || null,
					authors: book.volumeInfo.authors && book.volumeInfo.authors.toString(),
					publisher: book.volumeInfo.publisher || null,
					publishedDate: book.volumeInfo.publishedDate || null,
					description: book.volumeInfo.description || null,
					isbn10: null,
					isbn13: null,
					pageCount: book.volumeInfo.pageCount || null,
					categories: book.volumeInfo.categories || null,
					averageRating: book.volumeInfo.averageRating || null,
					thumbnail: (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : null),
					smallThumbnail: (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail.replace('http://', 'https://') : null),
					language: book.volumeInfo.language || null,
					webReaderLink: book.accessInfo.webReaderLink || null,
					textSnippet: (book.searchInfo && book.searchInfo.textSnippet) || null,
					isEbook: book.saleInfo.isEbook || null
				};
			});
			dispatch({ type: FETCH_SEARCH_SUCCESS, payload: {books: {totalItems: response.data.totalItems,  items: newBookArray}}});
		})
		.catch(error => {
			console.log(error);
			dispatch({ type: FETCH_SEARCH_FAILURE, payload: error.response });
		});
};

export const loadMore = (query, offset) => dispatch => {
	dispatch({ type: FETCH_LOAD_MORE });
	axios.get(`${googleBooksURL}?q=${query}&startIndex=${offset}`)
	//axios.post(`${readrrDSURL}`, {type: 'search', query: query})
		.then(response => {
			const newBookArray = response.data.items.map(book => {
				return {
					googleId: book.id,
					title: book.volumeInfo.title || null,
					authors: book.volumeInfo.authors && book.volumeInfo.authors.toString(),
					publisher: book.volumeInfo.publisher || null,
					publishedDate: book.volumeInfo.publishedDate || null,
					description: book.volumeInfo.description || null,
					isbn10: null,
					isbn13: null,
					pageCount: book.volumeInfo.pageCount || null,
					categories: book.volumeInfo.categories || null,
					averageRating: book.volumeInfo.averageRating || null,
					thumbnail: (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : null),
					smallThumbnail: (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail.replace('http://', 'https://') : null),
					language: book.volumeInfo.language || null,
					webReaderLink: book.accessInfo.webReaderLink || null,
					textSnippet: (book.searchInfo && book.searchInfo.textSnippet) || null,
					isEbook: book.saleInfo.isEbook || null
				};
			});
			dispatch({ type: LOAD_MORE, payload: newBookArray });
		})
		.catch(error => dispatch({ type: FETCH_SEARCH_FAILURE, payload: error.response }));
};

export const clearSearchResults = () => dispatch => {
	dispatch({ type: CLEAR_SEARCH_RESULTS, payload: '' });
};

export const setQuery = input => dispatch => {
	dispatch({ type: SET_QUERY, payload: input });
};