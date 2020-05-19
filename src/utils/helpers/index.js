import axios from 'axios';
import { notification } from 'antd';
import { axiosWithAuth } from '../axiosWithAuth';
import store from '../store';
import { fetchRecommendations } from '../../store/actions/recommendationActions';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

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
      if (data.book.industryIdentifiers) {
        data.book = {
          authors: data.book.authors && data.book.authors.toString(),
          averageRating: data.book.averageRating || null,
          categories:
            (data.book.categories && data.book.categories.toString()) || null,
          description: data.book.description || null,
          googleId: data.book.googleId,
          isEbook: data.book.isEbook || null,
          isbn10: null,
          isbn13: null,
          language: data.book.language || null,
          pageCount: data.book.pageCount || null,
          publishedDate: data.book.publishedDate || null,
          publisher: data.book.publisher || null,
          smallThumbnail: data.book.smallThumbnail
            ? data.book.smallThumbnail.replace('http://', 'https://')
            : null,
          textSnippet: data.book.textSnippet || null,
          title: data.book.title || null,
          thumbnail: data.book.thumbnail
            ? data.book.thumbnail.replace('http://', 'https://')
            : null,
          webReaderLink: data.book.webReaderLink || null,
        };
        axiosWithAuth()
          .post(`${API_URL}/api/${userId}/library`, data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      } else {
        axiosWithAuth()
          .post(`${API_URL}/api/${userId}/library`, data)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      }
    }
    if (method === 'put') {
      axiosWithAuth()
        .put(`${API_URL}/api/${userId}/library`, data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
    if (method === 'delete') {
      axiosWithAuth()
        .delete(`${API_URL}/api/${userId}/library`, {
          data: { bookId: readrrId },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
    store.dispatch(fetchRecommendations());
  });
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
  console.log('Fired');
  console.log(userId);
  let dateObj;
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
