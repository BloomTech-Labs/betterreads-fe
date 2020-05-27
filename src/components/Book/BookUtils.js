import React from 'react';
// Utils
import history from '../../utils/history';
import store from '../../utils/store';
import { updateDates } from '../../utils/helpers';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// Redux
import { updateSingleBookField, updateShelves } from '../../store/actions';
// Ant Design
import { Menu } from 'antd';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

// Dropdown shown under books
export const dropDown = (setState, source) => {
  return (
    <Menu onClick={(key) => setState(key.item.props.value)}>
      <Menu.Item key='1' value='1'>
        To read
      </Menu.Item>
      <Menu.Item key='2' value='2'>
        Reading
      </Menu.Item>
      <Menu.Item key='3' value='3'>
        Finished
      </Menu.Item>
      <Menu.Divider />
      {source === 'library' ? (
        <Menu.Item key='4' value='4'>
          Delete
        </Menu.Item>
      ) : (
        <></>
      )}
    </Menu>
  );
};
// This swithches between the different labels
// Based on the int parsed from reading status
export const dropDownSwitch = (readingStatus) => {
  switch (readingStatus) {
    case 1:
      return 'To Read';
    case 2:
      return 'Reading';
    case 3:
      return 'Finished';
    default:
      return 'Track This';
  }
};
// This handles routing when the book is clicked on
export const pageRoute = (googleId) => {
  history.push(`/book/${googleId}`);
  window.location.reload();
};

export const handleDates = (
  userID,
  libraryBook,
  dateString,
  index,
  setLibraryBook
) => {
  if (libraryBook) {
    console.log('Here');
    updateDates(userID, libraryBook.bookId, dateString, index)
      .then((res) => {
        const started =
          res.data.dateStarted && res.data.dateStarted.split('T')[0];
        const ended = res.data.dateEnded && res.data.dateEnded.split('T')[0];
        started &&
          store.dispatch(
            updateSingleBookField(
              libraryBook.bookId,
              'dateStarted',
              res.data.dateStarted.split('T')[0]
            )
          );
        ended &&
          store.dispatch(
            updateSingleBookField(
              libraryBook.bookId,
              'dateEnded',
              res.data.dateStarted.split('T')[0]
            )
          );
        setLibraryBook({
          ...libraryBook,
          dateStarted: started && started,
          dateEnded: ended && ended,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log('Edge Case Hit');
  }
};

// Reading Status Initial Set
// Reading Status Update
// Delete Book
// Update Rating
// Update Favorite

// This handles status based on the status value passed in && if it is in the user's library
export const handleStatus = (inLibrary, userID, book, status) => {
  console.log('Handling Status');
  return new Promise((res, rej) => {
    if (status === '4')
      deleteBook(userID, book)
        .then((data) => res(data))
        .catch((err) => rej(err));
    if (inLibrary)
      updateStatus(userID, book, status)
        .then((data) => res(data))
        .catch((err) => rej(err));
    if (!inLibrary)
      setStatus(userID, book, status)
        .then((data) => res(data))
        .catch((err) => rej(err));
  });
};

export const handleRating = (userID, book, rating) => {
  return new Promise((resolve, reject) => {
    updateRating(userID, book, rating)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const handleFavorite = (userID, book, favorite) => {
  return new Promise((resolve, reject) => {
    updateFavorite(userID, book, favorite)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// This updates the book in state to render the books correctly in the shelves
export const setBookStatus = (book, status) => {
  return new Promise((resolve, reject) => {
    book.readingStatus = status;
    store.dispatch(updateShelves());
  });
};

export const setStatus = (userID, book, status) => {
  console.log('Setting Status');
  return new Promise((resolve, reject) => {
    axiosWithAuth()
      .post(`${API_URL}/api/${userID}/library`, {
        book: book,
        readingStatus: status,
      })
      .then((res) => {
        setBookStatus(book, status);
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const updateStatus = (userID, book, status) => {
  console.log('Updating Status');
  return new Promise((resolve, reject) => {
    axiosWithAuth()
      .put(`${API_URL}/api/${userID}/library`, {
        ...book,
        readingStatus: status,
      })
      .then((res) => {
        setBookStatus(book, status);
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const deleteBook = (userID, book) => {
  console.log('Deleting Book');
  return new Promise((resolve, reject) => {
    axiosWithAuth()
      .delete(`${API_URL}/api/${userID}/library`, {
        data: { bookId: book.bookId },
      })
      .then((res) => {
        setBookStatus(book, 4);
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export const updateRating = (userID, book, rating) => {
  console.log('Updating Rating', book);
  return new Promise((resolve, reject) => {
    book.userRating = rating;
    axiosWithAuth()
      .put(`${API_URL}/api/${userID}/library`, book)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateFavorite = (userID, book, favorite) => {
  console.log('Updating Favorite');
  return new Promise((resolve, reject) => {
    if (book.bookId) {
      axiosWithAuth()
        .put(`${API_URL}/api/${userID}/library`, {
          ...book,
          favorite: favorite,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    } else {
      axiosWithAuth()
        .put(`${API_URL}/api/${userID}/library`, {
          book: book,
          readingStatus: 0,
          favorite: favorite,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    }
  });
};
