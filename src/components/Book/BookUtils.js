import React from 'react';
// Utils
import history from '../../utils/history';
// Moment
import moment from 'moment';
// Components
import BookIcon from './BookIcon';
// Ant Design
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';

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
const buttonClick = (googleId) => {
  history.push(`/book/${googleId}`);
};
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
          buttonClick(book.googleId);
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

export const BookInformation = ({ book }) => {
  return (
    <div className='title-author-and-favorite'>
      <div className='title-and-author'>
        <p
          data-testid='title-link'
          className='title'
          onClick={() => buttonClick(book.googleId)}
        >
          {book.title}
        </p>
        {book.authors && (
          <p
            data-testid='author-link'
            className='author'
            onClick={() => buttonClick(book.googleId)}
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

export const BookCalendars = ({ library }) => {
  // const googleId = book.googleId;
  // const library = isLibrary(googleId);
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
          onChange={(date, dateString) => {
            console.log(date, dateString, 0);
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
          onChange={(date, dateString) => {
            console.log(date, dateString, 1);
          }}
        />
      </div>
    </div>
  );
};
