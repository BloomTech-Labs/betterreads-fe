//Import React
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import { editShelfName, deleteShelf } from '../../store/actions';
//Import components
import BookCard from './BookCard';
import SearchPagination from '../search/SearchPagination';
//Design
import { Menu, Dropdown, Popconfirm, message } from 'antd';
// Utils
import history from '../../utils/history';

import BookCardListContainer from './styles/BookCardListStyle';

const BookCardList = (props) => {
  const [shelfName, setShelfName] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => setShelfName(props.label), [props.label]);

  const onChange = (event) => {
    setShelfName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.editShelfName(props.currentShelf.id, shelfName);
    setEditing(false);
  };

  const confirm = (event) => {
    props.deleteShelf(props.currentShelf.id, history);
    message.success('Successfully deleted shelf');
  };

  const cancel = (event) => {
    message.error('Cancelled');
  };

  const dropdown = (
    <Menu>
      <Menu.Item>
        <Popconfirm
          title='Are you sure you want to delete this shelf?'
          onConfirm={confirm}
          onCancel={cancel}
          okText='Yes'
          cancelText='No'
        >
          <a href='#'>
            <i
              className='fas fa-trash'
              style={{ marginRight: '4px', color: '#3b403d' }}
            ></i>
            Delete
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* This checking needs to be addressed */}
      <BookCardListContainer>
        {props.label &&
          props.label !== 'My books' &&
          props.label !== 'Favorites' &&
          props.label !== 'To be read' &&
          props.label !== 'In progress' &&
          props.label !== 'Finished' && (
            <div className='shelf-name' data-testid='shelf-name-div'>
              {editing ? (
                <form
                  onSubmit={onSubmit}
                  onBlur={onSubmit}
                  autoComplete='off'
                  spellCheck='false'
                  data-testid='edit-form'
                >
                  <input
                    type='text'
                    value={shelfName}
                    onChange={onChange}
                    autoFocus
                    data-testid='edit-input'
                  />
                </form>
              ) : (
                <>
                  <h2
                    onClick={() => setEditing(true)}
                    title='Edit'
                    data-testid='edit-h2'
                  >
                    {shelfName}
                    <i
                      className='fas fa-pen'
                      onClick={() => setEditing(true)}
                      data-testid='edit-icon'
                    ></i>
                  </h2>
                  <Dropdown overlay={dropdown} trigger={['click']}>
                    <i className='fas fa-ellipsis-h' title='Options'></i>
                  </Dropdown>
                </>
              )}
            </div>
          )}
        {(props.label && props.label === 'My books') ||
        props.label === 'Favorites' ||
        props.label === 'To be read' ||
        props.label === 'In progress' ||
        props.label === 'Finished' ? (
          <div className='shelf-name' data-testid='my-book-shelf-name'>
            <h2>{shelfName}</h2>
          </div>
        ) : null}

        <div className='book-card-list'>
          {props.books &&
            props.books.map((item, index) => (
              <BookCard
                key={index}
                book={item}
                source={props.source}
                data-testid='book-card'
              />
            ))}
        </div>

        {props.source === 'search' && <SearchPagination data-testid='search-pagination'/>}
      </BookCardListContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentShelf: state.library.currentShelf,
  };
};

export default connect(mapStateToProps, { editShelfName, deleteShelf })(
  BookCardList
);
