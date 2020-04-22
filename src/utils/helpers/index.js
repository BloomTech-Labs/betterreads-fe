import axios from 'axios';
import { notification } from 'antd';
import { axiosWithAuth } from '../axiosWithAuth';
import store from '../../utils/store';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';
const state = store.getState();

export const updateBookItem = (
  userId,
  readrrId,
  inLibrary,
  book,
  action,
  favorite,
  readingStatus
) => {
  let method = inLibrary ? 'put' : 'post';

  let data;
  if (inLibrary) {
    data = {
      bookId: readrrId,
      readingStatus: parseInt(readingStatus),
      favorite: favorite,
    };
  } else {
    data = {
      book,
      favorite: favorite,
      readingStatus: parseInt(readingStatus),
    };
  }

  if (parseInt(readingStatus) === 4) {
    method = action = 'delete';
    data = {
      bookId: readrrId,
    };
  }

  // save a book as a favorite or update its reading status
  return new Promise((resolve, reject) => {
    if (method === 'post') {
      axiosWithAuth()
        .post(`${API_URL}/api/${userId}/library`, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
    if (method === 'put') {
      axiosWithAuth()
        .put(`${API_URL}/api/${userId}/library`, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
    if (method === 'delete') {
      axiosWithAuth()
        .delete(`${API_URL}/api/${userId}/library`, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
  });
  // return axios({
  //   method,
  //   url: `${API_URL}/api/${userId}/library`,
  //   data,
  //   headers: {
  //     Authorization: `${state.authentication.token}`,
  //   },
  // });
};

export const sendUpTheFlares = (type, message, description) => {
  notification.open({
    type,
    message,
    description,
    duration: 1.5,
  });
};

export const updateDates = (userId, readrrId, dateString, whichDate) => {
  let dateObj;
  // whichDate 0/true for start date
  // 1/false for end date
  if (!whichDate) {
    dateObj = {
      bookId: readrrId,
      dateStarted: dateString,
    };
  } else {
    dateObj = {
      bookId: readrrId,
      dateEnded: dateString,
    };
  }

  return axiosWithAuth().put(`${API_URL}/api/${userId}/library`, dateObj);
};

export const updateUserRating = (userId, bookId, userRating) => {
  // return axios.put(`${API_URL}/api/${userId}/library`, { bookId, userRating });
  return axios({
    method: 'PUT',
    url: `${API_URL}/api/${userId}/library`,
    data: { bookId, userRating },
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
};
