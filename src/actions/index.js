import axios from 'axios';
axios.defaults.withCredentials = true;

const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const apiLocal = 'http://api.readrr.app';

export const FETCH_SEARCH_START = 'FETCH_SEARCH_START';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';
export const SENDING_BOOK_LIBRARY = 'SENDING_BOOK_LIBRARY';
export const SENDING_BOOK_LIBRARY_SUCCESS = 'SENDING_BOOK_LIBRARY_SUCCESS';
export const SENDING_BOOK_LIBRARY_FAILURE = 'SENDING_BOOK_LIBRARY_FAILURE';
export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';
export const FETCH_USERS_BOOKS = 'FETCH_USERS_BOOKS';
export const FETCH_USERS_SHELVES = 'FETCH_USERS_SHELVES';
export const CREATE_USER_SHELF = 'CREATE_USER_SHELF';
export const CREATE_USER_SHELF_SUCCESS = 'CREATE_USER_SHELF_SUCCESS';
export const CREATE_USER_SHELF_FAILURE = 'CREATE_USER_SHELF_FAILURE';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SET_QUERY = 'SET_QUERY';

export const signUp = (input, history) => dispatch => {
	if (input.password !== input.confirmPassword) {
		dispatch({ type: SET_ERROR, payload: 'Passwords do not match' });
	} else {
		axios
			.post(`${apiLocal}/auth/signup`, {
				fullName: input.fullName,
				emailAddress: input.emailAddress,
				username: input.fullName,
				password: input.password
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('id', response.data.user.id);
				localStorage.setItem('full_name', response.data.user.fullName);
				localStorage.setItem('image', response.data.user.image);
				history.push('/');
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: SET_ERROR,
					payload: 'Email address already in use'
				});
			});
	}
};

export const signIn = (input, history) => dispatch => {
	axios
		.post(`${apiLocal}/auth/signin`, input)
		.then(response => {
			console.log(response);
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/');
		})
		.catch(error => {
			console.log(error);
			dispatch({
				type: SET_ERROR,
				payload: 'Invalid credentials'
			});
		});
};

// authentication errors are held in redux state and therefore persists between components, this resets that error
export const resetError = () => dispatch => {
	dispatch({ type: RESET_ERROR });
};

export const successRedirect = history => dispatch => {
	// even though im not dispatching an action type, i still need to include dispatch or else redux logger throws an error
	axios
		.get(`${apiLocal}/auth/success`)
		.then(response => {
			console.log('social media user object', response);
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/');
		})
		.catch(error => console.log(error));
};

export const signOut = history => dispatch => {
	axios
		.get(`${apiLocal}/auth/signout`)
		.then(response => {
			console.log(response);
			localStorage.removeItem('id');
			localStorage.removeItem('full_name');
			localStorage.removeItem('image');
			history.push('/signin');
		})
		.catch(error => console.log(error));
};

export const fetchUsersBooks = userID => dispatch => {
	axios
		.get(`${apiLocal}/${userID}/library`)
		.then(response => {
			dispatch({ type: FETCH_USERS_BOOKS, payload: response.data });
		})
		.catch(error => console.log(error));
};

export const fetchUsersShelves = userID => dispatch => {
	axios
		.get(`${apiLocal}/shelves/user/${userID}`)
		.then(response => {
			dispatch({ type: FETCH_USERS_SHELVES, payload: response.data });
		})
		.catch(error => console.log(error));
};

export const fetchShelfsBooks = shelfID => dispatch => {
	axios
		.get(`${apiLocal}/shelves/${shelfID}`)
		.then(response => console.log(response.data))
		.catch(error => console.log(error));
};

export const getGoogleResults = search => dispatch => {
	dispatch({ type: FETCH_SEARCH_START });
	axios
		.get(`${apiURL}${search}`)
		.then(results =>
			dispatch({
				type: FETCH_SEARCH_SUCCESS,
				payload: { query: search, books: results.data }
			})
		)
		.catch(err =>
			dispatch({ type: FETCH_SEARCH_FAILURE, payload: err.response })
		);
};

export const clearSearchResults = () => dispatch => {
	dispatch({ type: CLEAR_SEARCH_RESULTS, payload: {} });
};

export const saveBookToLibrary = (userId, actionType, bookId, book, readingStatus, favorite) => dispatch => {
	// dispatch({ type: ADD_BOOK_TO_LIBRARY_START });
	
	// if(actionType === 'favorite'){
		
	// }else{

	// }

	// const modifiedBook = {
	// 	book: {
	// 		googleId: book.id,
	// 		title: book.volumeInfo.title || null,
	// 		authors: book.volumeInfo.authors.toString() || null,
	// 		publisher: book.volumeInfo.publisher || null,
	// 		publishedDate: book.volumeInfo.publishedDate || null,
	// 		description: book.volumeInfo.description || null,
	// 		isbn10: book.volumeInfo.industryIdentifiers[0].identifier || null,
	// 		isbn13: book.volumeInfo.industryIdentifiers[1].identifier || null,
	// 		pageCount: book.volumeInfo.pageCount || null,
	// 		categories: book.volumeInfo.categories.toString() || null,
	// 		thumbnail: book.volumeInfo.imageLinks.thumbnail || null,
	// 		smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail || null,
	// 		language: book.volumeInfo.language || null,
	// 		webReaderLink: book.accessInfo.webReaderLink || null,
	// 		textSnippet: book.searchInfo.textSnippet || null,
	// 		isEbook: book.saleInfo.isEbook || null
	// 	},
	// 	readingStatus: readingStatus || null,
	// 	favorite: favorite  // true || false
	// };

	// axios
	// 	.post(`${apiLocal}/${userId}/library`, modifiedBook)
	// 	.then(results => dispatch({ type: ADD_BOOK_TO_LIBRARY_SUCCESS, payload: results.data}))
	// 	.catch(err => dispatch({ type: ADD_BOOK_TO_LIBRARY_FAILURE, payload: err.response }));
};

export const createUserShelf = (
	userId,
	shelfName,
	shelfPrivate,
	setModalConfig
) => dispatch => {
	dispatch({ type: CREATE_USER_SHELF });
	axios
		.post(`${apiLocal}/shelves/${userId}`, {
			shelfName: shelfName,
			isPrivate: shelfPrivate
		})
		.then(res => {
			//dispatch({ type: CREATE_USER_SHELF_SUCCESS, payload: res.data });
		})
		.catch(err =>
			dispatch({ type: CREATE_USER_SHELF_FAILURE, payload: err.resonse })
		);
};

export const setQuery = input => dispatch => {
	dispatch({ type: SET_QUERY, payload: input });
};
