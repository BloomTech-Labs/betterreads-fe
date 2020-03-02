import axios from 'axios';
axios.defaults.withCredentials = true;

const apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';
const apiLocal = 'http://localhost:5000/api';

export const FETCH_SEARCH_START = 'FETCH_SEARCH_START';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';
export const SENDING_BOOK_LIBRARY = 'SENDING_BOOK_LIBRARY';
export const SENDING_BOOK_LIBRARY_SUCCESS = 'SENDING_BOOK_LIBRARY_SUCCESS';
export const SENDING_BOOK_LIBRARY_FAILURE = 'SENDING_BOOK_LIBRARY_FAILURE';
export const SET_ERROR = 'SET_ERROR';
export const FETCH_USERS_BOOKS = 'FETCH_USERS_BOOKS';
export const FETCH_USERS_SHELVES = 'FETCH_SHELVES_BOOKS';
export const CREATE_USER_SHELF = 'CREATE_USER_SHELF';
export const CREATE_USER_SHELF_SUCCESS = 'CREATE_USER_SHELF_SUCCESS';
export const CREATE_USER_SHELF_FAILURE = 'CREATE_USER_SHELF_FAILURE';

export const signUp = (input, history) => dispatch => {
	if (input.password !== input.confirmPassword) {
		dispatch({ type: SET_ERROR, payload: 'Passwords do not match' });
	} else {
		axios
			.post('http://localhost:5000/api/auth/signup', {
				fullName: input.fullName,
				emailAddress: input.emailAddress,
				username: input.username,
				password: input.password
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('id', response.data.user.id);
				localStorage.setItem('full_name', response.data.user.fullName);
				localStorage.setItem('image', response.data.user.image);
				history.push('/library');
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: SET_ERROR,
					payload: 'Email address already in use or username taken'
				});
			});
	}
};

export const signIn = (input, history) => dispatch => {
	axios
		.post('http://localhost:5000/api/auth/signin', input)
		.then(response => {
			console.log(response);
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/library');
		})
		.catch(error => {
			console.log(error);
			dispatch({
				type: SET_ERROR,
				payload: 'Invalid credentials'
			});
		});
};

export const successRedirect = history => dispatch => {
	// even though im not dispatching an action type, i still need to include dispatch or else redux logger throws an error
	axios
		.get('http://localhost:5000/api/auth/success')
		.then(response => {
			console.log('social media user object', response);
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/library');
		})
		.catch(error => console.log(error));
};

export const signOut = history => dispatch => {
	axios
		.get('http://localhost:5000/api/auth/signout')
		.then(response => {
			console.log(response);
			console.log(history)
			localStorage.removeItem('id');
			localStorage.removeItem('full_name');
			localStorage.removeItem('image');
			history.push('/');
		})
		.catch(error => console.log(error));
};

export const fetchUsersBooks = userID => dispatch => {
	axios
		.get(`http://localhost:5000/api/${userID}/library`)
		.then(response => {
			console.log('FETCH_USERS_BOOKS', response);
			dispatch({ type: FETCH_USERS_BOOKS, payload: response.data });
		})
		.catch(error => console.log(error));
};

export const fetchUsersShelves = userID => dispatch => {
	axios
		.get(`http://localhost:5000/api/shelves/${userID}`)
		.then(response => {
			dispatch({ type: FETCH_USERS_SHELVES, payload: response.data });
		})
		.catch(error => console.log(error));
};

export const getGoogleResults = search => dispatch => {
	dispatch({ type: FETCH_SEARCH_START });
	axios
		.get(`${apiURL}${search}`)
		.then(results =>
			dispatch({ type: FETCH_SEARCH_SUCCESS, payload: results.data })
		)
		.catch(err =>
			dispatch({ type: FETCH_SEARCH_FAILURE, payload: err.response })
		);
};

export const saveBookToLibrary = (userId, bookId, book) => dispatch => {
	dispatch({ type: SENDING_BOOK_LIBRARY });
	// axios.post(`${apiLocal}/${userId}/library/${bookId}`, book)
	//     .then(results => dispatch({ type: SENDING_BOOK_LIBRARY_SUCCESS, payload: results.data}))
	//     .catch(err => dispatch({ type: SENDING_BOOK_LIBRARY_FAILURE, payload: err.response }))
	axios
		.post(`${apiLocal}/${userId}/library`, book)
		.then(results => console.log(results))
		.catch(err => console.log(err.response));
};

export const createUserShelf = (userId, shelfName, shelfPrivate, setModalConfig) => dispatch => {
	dispatch({ type: CREATE_USER_SHELF });
	axios.post(`http://localhost:5000/api/shelves/${userId}`, { shelfName: shelfName, isPrivate: shelfPrivate })
        .then(res => {
			//dispatch({ type: CREATE_USER_SHELF_SUCCESS, payload: res.data });
		})
		.catch(err => dispatch({ type: CREATE_USER_SHELF_FAILURE, payload: err.resonse}))
}
