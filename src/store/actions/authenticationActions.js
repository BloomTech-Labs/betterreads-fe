import { SET_ERROR, RESET_ERROR, SET_TOKEN, SET_USER } from './types';
import axios from 'axios';
import jwt from 'jwt-decode';

axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL || 'https://staging.readrr.app/';

export const signUp = (input, history) => (dispatch) => {
  if (input.password !== input.confirmPassword) {
    dispatch({ type: SET_ERROR, payload: 'Passwords do not match' });
  } else {
    axios
      .post(`${API_URL}/api/auth/signup`, {
        fullName: input.fullName,
        emailAddress: input.emailAddress,
        password: input.password,
      })
      .then((response) => {
        const user = response.data.user;
        const test = jwt(response.data.token);
        dispatch({ type: SET_TOKEN, payload: response.data.token });
        dispatch({ type: SET_USER, payload: test });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', user.subject);
        localStorage.setItem('full_name', user.fullName);
        localStorage.setItem('id', response.data.user.id);
        localStorage.setItem('full_name', response.data.user.fullName);
        localStorage.setItem('image', response.data.user.image);
        history.push('/');
      })
      .catch((error) => {
        console.log('Error', error);
        dispatch({ type: SET_ERROR, payload: 'Email address already in use' });
      });
  }
};

export const signIn = (input, history) => (dispatch) => {
  console.log('Here');
  axios
    .post(`${API_URL}/api/auth/signin`, input)
    .then((response) => {
      const user = response.data.user;
      const test = jwt(response.data.token);
      dispatch({ type: SET_TOKEN, payload: response.data.token });
      dispatch({ type: SET_USER, payload: test });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', user.subject);
      localStorage.setItem('full_name', user.fullName);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('full_name', response.data.user.fullName);
      localStorage.setItem('image', response.data.user.image);
      history.push('/');
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: SET_ERROR, payload: 'Invalid credentials' });
    });
};

export const resetError = () => (dispatch) => dispatch({ type: RESET_ERROR });

export const successRedirect = (history) => (dispatch) => {
  axios
    .get(`${API_URL}/api/auth/success`)
    .then((response) => {
      const user = response.data.user;
      const test = jwt(response.data.token);
      dispatch({ type: SET_TOKEN, payload: response.data.token });
      dispatch({ type: SET_USER, payload: test });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', user.subject);
      localStorage.setItem('full_name', user.fullName);
      localStorage.setItem('image', user.image);
      localStorage.setItem('id', response.data.user.id);
      localStorage.setItem('full_name', response.data.user.fullName);
      localStorage.setItem('image', response.data.user.image);
      history.push('/');
    })
    .catch((error) => console.log(error));
};

export const signOut = (history) => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('image');
  axios
    .get(`${API_URL}/api/auth/signout`)
    .then((response) => {
      localStorage.setItem('token', '');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('full_name');
      localStorage.removeItem('image');
      history.push('/signin');
    })
    .catch((error) => console.log(error));
};

export const sendUserGenres = (genres) => {
  // uncertain from docs what needs to be passed
  axios
    .post(`${API_URL}/api/genres`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
