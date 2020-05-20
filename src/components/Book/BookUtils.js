import React from 'react';
// Utils
import history from '../../utils/history';
import store from '../../utils/store';
import { updateDates } from '../../utils/helpers';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
// Redux
import { updateSingleBookField } from '../../store/actions';
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
        In progress
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
      return 'In Progress';
    case 3:
      return 'Finished';
    default:
      return 'Track This';
  }
};
// This handles routing when the book is clicked on
export const pageRoute = (googleId) => {
  history.push(`/book/${googleId}`);
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
        console.log('Res: ', res);
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

export const handleStatus = (inLibrary, userID, book, status) => {
  console.log('Handling Status');
  console.log('Status', status);
  if(status === '4') deleteBook(userID, book)
  if (inLibrary) updateStatus(userID, book, status);
  if (!inLibrary) setStatus(userID, book, status);
};

export const setStatus = (userID, book, status) => {
  console.log('Setting Status');
  console.log(userID, book, status);
  return new Promise((resolve, reject) => {});
};

export const updateStatus = (userID, book, status) => {
  console.log('Updating Status');
  console.log(userID, book, status);
  return new Promise((resolve, reject) => {});
};

export const deleteBook = (userID, book) => {
  console.log('Deleting Book');
  return new Promise((resolve, reject) => {
    axiosWithAuth()
      .delete(`${API_URL}/api/${userID}/library`, {
        data: { bookId: book.bookId },
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateRating = (userID, bookID, rating) => {
  console.log('Updating Rating');
  return new Promise((resolve, reject) => {});
};

export const updateFavorite = (userID, bookID, favorite) => {
  console.log('Updating Favorite');
  return new Promise((resolve, reject) => {});
};
