import { SET_CURRENT_BOOK, SET_BREADCRUMBS } from './types';
import axios from 'axios';

axios.defaults.withCredentials = true;

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchCurrentBook = googleID => dispatch => {
	axios.get(`${googleBooksURL}/${googleID}`).then(response => {
			dispatch({ type: SET_CURRENT_BOOK, payload: {
				googleId: response.data.id,
				title: response.data.volumeInfo.title || null,
				authors: response.data.volumeInfo.authors && response.data.volumeInfo.authors.toString(),
				publisher: response.data.volumeInfo.publisher || null,
				publishedDate: response.data.volumeInfo.publishedDate || null,
				description: response.data.volumeInfo.description || null,
				isbn10: null,
				isbn13: null,
				pageCount: response.data.volumeInfo.pageCount || null,
				categories: response.data.volumeInfo.categories.toString() || null,
				averageRating: response.data.volumeInfo.averageRating || null,
				thumbnail: (response.data.volumeInfo.imageLinks ? response.data.volumeInfo.imageLinks.thumbnail.replace('http://', 'https://') : null),
				smallThumbnail: (response.data.volumeInfo.imageLinks ? response.data.volumeInfo.imageLinks.smallThumbnail.replace('http://', 'https://') : null),
				language: response.data.volumeInfo.language || null,
				webReaderLink: response.data.accessInfo.webReaderLink || null,
				textSnippet: (response.data.searchInfo && response.data.searchInfo.textSnippet) || null,
				isEbook: response.data.saleInfo.isEbook || null
			}})
		})
		.catch(error => console.log(error));
};

export const setBreadcrumbs = breadcrumbs => dispatch => {
	dispatch({ type: SET_BREADCRUMBS, payload: breadcrumbs });
};