import { SET_ERROR, RESET_ERROR,  } from './index';
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

export const signUp = (input, history) => dispatch => {
	if (input.password !== input.confirmPassword) {
		dispatch({ type: SET_ERROR, payload: 'Passwords do not match' });
	} else {
		axios.post(`${API_URL}/api/auth/signup`, { fullName: input.fullName, emailAddress: input.emailAddress, password: input.password })
			.then(response => {
				localStorage.setItem('id', response.data.user.id);
				localStorage.setItem('full_name', response.data.user.fullName);
				localStorage.setItem('image', response.data.user.image);
				history.push('/');
			})
			.catch(error => dispatch({ type: SET_ERROR, payload: 'Email address already in use' }));
	};
};

export const signIn = (input, history) => dispatch => {
	axios.post(`${API_URL}/api/auth/signin`, input)
		.then(response => {
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/');
		})
		.catch(error => dispatch({ type: SET_ERROR, payload: 'Invalid credentials' }));
};

export const resetError = () => dispatch => dispatch({ type: RESET_ERROR });

export const successRedirect = history => dispatch => {
	axios.get(`${API_URL}/api/auth/success`)
		.then(response => {
			localStorage.setItem('id', response.data.user.id);
			localStorage.setItem('full_name', response.data.user.fullName);
			localStorage.setItem('image', response.data.user.image);
			history.push('/');
		})
};

export const signOut = history => dispatch => {
	axios.get(`${API_URL}/api/auth/signout`)
		.then(response => {
			localStorage.removeItem('id');
			localStorage.removeItem('full_name');
			localStorage.removeItem('image');
			history.push('/signin');
		})
};