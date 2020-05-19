import React from 'react';
// Book Utils
import { dropDownSwitch, dropDown, pageRoute, handleDates } from './BookUtils';
// Moment
import moment from 'moment';
// Components
import BookIcon from './BookIcon';
// Ant Design
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';

// Thumbnail && Status Component
export const BookThumbnail = ({ book, source, library }) => {
  // If in library set to reading status
  // Else set to 4..Track This
  const [status, setStatus] = React.useState(
    library ? library.readingStatus : '4'
  );
  // Parses the correct label based on the reading status
  const [label, setLabel] = React.useState(
    library ? dropDownSwitch(parseInt(status)) : 'Track This'
  );
  // This watches the status for updates and updates the label
  React.useEffect(() => {
    setLabel(library ? dropDownSwitch(parseInt(status)) : 'Track This');
  }, [library, status]);

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
export const BookInformation = ({ book }) => {
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
          onChange={(_date, dateString) => {
            handleDates(userID, library, dateString, 1, setLibraryBook);
          }}
        />
      </div>
    </div>
  );
};
