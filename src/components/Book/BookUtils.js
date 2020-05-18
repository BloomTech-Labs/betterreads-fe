import React from 'react';
// Utils
import history from '../../utils/history';
// Redux Store
import store from '../../utils/store';
// Moment
import moment from 'moment';
// Components
import BookIcon from './BookIcon';
// Ant Design
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import HeartOutlined from '@ant-design/icons';
import HeartFilled from '@ant-design/icons';

const state = store.getState();

const isLibrary = (googleId) => {
  const libraryBook = state.library.userBooks.find(
    (book) => book.googleId === googleId
  );
  if (libraryBook) return libraryBook;
  return false;
};

export const searchDropDown = (readingStatusUpdate) => {
  return (
    <Menu onClick={(key) => readingStatusUpdate(key)}>
      <Menu.Item key='1' value='1'>
        To read
      </Menu.Item>
      <Menu.Item key='2' value='2'>
        In progress
      </Menu.Item>
      <Menu.Item key='3' value='3'>
        Finished
      </Menu.Item>
    </Menu>
  );
};

export const libraryDropDown = (readingStatusUpdate) => {
  return (
    <Menu onClick={(key) => readingStatusUpdate(key)}>
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
      <Menu.Item key='4' value='4'>
        Delete
      </Menu.Item>
    </Menu>
  );
};

export const dropDownSwitch = (readingStatus) => {
  console.log(readingStatus);
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

const buttonClick = (googleId) => {
  history.push(`/book/${googleId}`);
};

export const BookThumbnail = ({ book, source }) => {
  const library = isLibrary(book.googleId);
  const label = library
    ? dropDownSwitch(parseInt(library.readingStatus))
    : 'Track this';
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

      <Dropdown
        overlay={source === 'search' ? searchDropDown : libraryDropDown}
        trigger={['click']}
      >
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

export const BookCalendars = () => {
  return (
    <div className='calendars'>
      <div className='calendar'>
        <p>DATE STARTED</p>
        <DatePicker
          placeholder='Started'
          defaultValue={
            isLibrary() && isLibrary().dateStarted
              ? moment(isLibrary().dateStarted, 'YYYY-MM-DD')
              : null
          }
          onChange={(date, dateString) => console.log(date, dateString, 0)}
        />
      </div>

      <div className='calendar'>
        <p>DATE ENDED</p>
        <DatePicker
          placeholder='Ended'
          defaultValue={
            isLibrary() && isLibrary().dateEnded
              ? moment(isLibrary().dateEnded, 'YYYY-MM-DD')
              : null
          }
          onChange={(date, dateString) => console.log(date, dateString, 1)}
        />
      </div>
    </div>
  );
};
