import React from 'react';
// Book Utils
import {
  dropDownSwitch,
  dropDown,
  pageRoute,
  handleDates,
  handleStatus,
  handleRating,
  handleFavorite,
} from './BookUtils';
// Moment
import moment from 'moment';
// Components
import BookIcon from './BookIcon';
// Ant Design
import { Dropdown, Button, DatePicker, Rate, notification } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import HeartOutlined from '@ant-design/icons/HeartOutlined';

const showNotification = (type, title, desc) => {
  notification.open({
    type: type,
    message: title,
    description: desc,
    duration: 1.25,
  });
};

// Thumbnail && Status Component
export const BookThumbnail = ({ book, source, library, userID }) => {
  // If in library set to reading status
  // Else set to 4..Track This
  const [status, setStatus] = React.useState(
    library ? library.readingStatus : '0'
  );
  // Parses the correct label based on the reading status
  const [label, setLabel] = React.useState(
    library ? dropDownSwitch(parseInt(status)) : 'Track This'
  );
  // References to check which state changed
  const statusRef = React.useRef(status);
  // This watches the status for updates and updates the label
  React.useEffect(() => {
    setLabel(library ? dropDownSwitch(parseInt(status)) : 'Track This');
    // Call this when there is a status change
    if (statusRef.current !== status)
      handleStatus(library, userID, book, status)
        .then((_res) =>
          showNotification('success', 'Success', 'Book Status Updated!')
        )
        .catch((_err) =>
          showNotification('error', 'Error', 'Error Updating Status!')
        );
  }, [library, status, book, userID]);

  return (
    <div className='thumbnail-container'>
      <div
        data-testid='thumb-button'
        className='thumbnail'
        onClick={() => {
          pageRoute(book.googleId);
        }}
      >
        {!book.thumbnail && !book.smallThumbnail && (
          <BookIcon height='40px' width='40px' fill='#547862' />
        )}
      </div>

      <Dropdown overlay={dropDown(setStatus, source)} trigger={['click']}>
        <Button className={label === 'Track this' ? 'orange' : 'green'}>
          {label}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
// This handles thge book information
// Title&&Authors
export const BookInformation = ({ userID, book }) => {
  const [favorite, setFavorite] = React.useState(book.favorite);
  // This allows tracking favorite explicitly
  // The reason this is needed is due to the useEffect deps
  const favRef = React.useRef(favorite);

  React.useEffect(() => {
    if (favRef.current !== favorite)
      handleFavorite(userID, book, !book.favorite)
        .then((_res) =>
          showNotification('success', 'Success', 'Book Favorite Updated!')
        )
        .catch((_err) =>
          showNotification('error', 'Error', 'Error Updating Favorite')
        );
  }, [userID, book, favorite]);

  return (
    <div className='title-author-and-favorite'>
      <div className='title-and-author'>
        <p
          data-testid='title-link'
          className='title'
          onClick={() => pageRoute(book.googleId)}
        >
          {book.title}
        </p>
        {book.authors && (
          <p
            data-testid='author-link'
            className='author'
            onClick={() => pageRoute(book.googleId)}
          >
            {book.authors.includes(',')
              ? book.authors.split(',')[0]
              : book.authors}
          </p>
        )}
      </div>
      {window.location.pathname !== '/book/' + book.googleId ? (
        <div className='favorite'>
          {favorite ? (
            <HeartFilled onClick={() => setFavorite(!book.favorite)} />
          ) : (
            <HeartOutlined onClick={() => setFavorite(!book.favorite)} />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
// This handles the date pickers for the book
export const BookCalendars = ({ library, setLibraryBook, userID }) => {
  return (
    <div className='calendars'>
      <div className='calendar'>
        <p>DATE STARTED</p>
        <DatePicker
          placeholder='Started'
          defaultValue={
            library && library.dateStarted
              ? moment(library.dateStarted, 'YYYY-MM-DD')
              : null
          }
          suffixIcon={true}
          onChange={(_date, dateString) => {
            handleDates(userID, library, dateString, 0, setLibraryBook);
          }}
        />
      </div>

      <div className='calendar'>
        <p>DATE ENDED</p>
        <DatePicker
          placeholder='Ended'
          defaultValue={
            library && library.dateEnded
              ? moment(library.dateEnded, 'YYYY-MM-DD')
              : null
          }
          suffixIcon={true}
          onChange={(_date, dateString) => {
            handleDates(userID, library, dateString, 1, setLibraryBook);
          }}
        />
      </div>
    </div>
  );
};

export const BookRating = ({ book, userID, rating }) => {
  // This checks for a field that only exists if the book is in the users library
  const libraryBool = book.bookId ? true : false;

  const updateRating = (e) => {
    handleRating(userID, book, e)
      .then((_res) =>
        showNotification('success', 'Success', 'Book Rating Updated!')
      )
      .catch((_err) =>
        showNotification('error', 'Error', 'Error Updating Rating!')
      );
  };

  return (
    <div>
      <Rate
        defaultValue={parseFloat(rating)}
        disabled={!libraryBool}
        allowHalf
        style={{ color: '#d24719' }}
        onChange={(e) => updateRating(e)}
      />
    </div>
  );
};
