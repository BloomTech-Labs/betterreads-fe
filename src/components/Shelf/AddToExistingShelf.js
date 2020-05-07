//Import React
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  deleteFromCustomShelf,
  addToCustomShelf,
  getUserShelves,
  getBooksOnShelves,
  addBookToUserLibrary,
} from '../../store/actions';
//Styling
import { Checkbox, Collapse } from 'antd';
import ShelfContainer from './styles/AddToExistingShelfStyle';
//Import Components
import CreateNewShelfModal from './CreateNewShelfModal';
//Tracking
import { Event } from '../../utils/tracking';
//Helpers
import { sendUpTheFlares } from '../../utils/helpers';

const AddToExistingShelf = (props) => {
  const onChange = (event) => {
    const book = props.userBooksOnShelves
      .find((item) => item.shelfId === event.target.name)
      .books.find((item) => item.googleId === props.bookId);
    if (event.target.checked === true) {
      props.addBookToUserLibrary(props.currentBook);
      props.addToCustomShelf(props.currentBook, event.target.name);
      sendUpTheFlares(
        'success',
        'Success',
        'Book has been added to your shelf.'
      );
      Event('SHELF', 'User added a book to a shelf', 'ADD_TO_SHELF');
    } else {
      props.deleteFromCustomShelf(book.bookId, event.target.name);
      sendUpTheFlares(
        'warning',
        'Success',
        'Book has been deleted from your shelf.'
      );
      Event('SHELF', 'User removed a book from a shelf', 'ADD_TO_SHELF');
    }
  };

  return (
    <ShelfContainer data-testid='shelf-container'>
      <Collapse
        defaultActiveKey={1}
        bordered={false}
        expandIconPosition='right'
      >
        <Collapse.Panel
          header={`Shelves (${props.userBooksOnShelves.length})`}
          showArrow={true}
          key={0}
          data-testid='panel'
        >
          {props.userBooksOnShelves &&
            props.userBooksOnShelves.map((item, index) => (
              <Checkbox
                key={index}
                data-testid='checkbox'
                name={item.shelfId}
                onChange={onChange}
                defaultChecked={
                  item.books.find((item) => item.googleId === props.bookId)
                    ? true
                    : false
                }
              >
                {item.shelfName}
              </Checkbox>
            ))}
          <CreateNewShelfModal data-testid='modal' />
        </Collapse.Panel>
      </Collapse>
    </ShelfContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooksOnShelves: state.shelf.userBooksOnShelves,
    userBooks: state.library.userBooks,
    currentBook: state.book.currentBook,
  };
};

export default connect(mapStateToProps, {
  addToCustomShelf,
  deleteFromCustomShelf,
  getUserShelves,
  getBooksOnShelves,
  addBookToUserLibrary,
})(AddToExistingShelf);
