import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteFromCustomShelf, addToCustomShelf, getUserShelves, getBooksOnShelves } from '../../actions';
import { Checkbox } from 'antd';

const AddToExistingShelf = props => {
	const onChange = event => {
		const book = props.userBooksOnShelves.find(item => item.shelfId === event.target.name).books.find(item => item.googleId === props.bookId);
		if (event.target.checked === true) {
			props.addToCustomShelf(props.currentBook, event.target.name);
		} else {
			props.deleteFromCustomShelf(book.bookId, event.target.name);
		};
	};

    return (
      	<div>
			<h2>Shelves ({props.userBooksOnShelves.length})</h2>	
			{props.userBooksOnShelves && props.userBooksOnShelves.map((item, index) => (
				<Checkbox key={index} name={item.shelfId} onChange={onChange} defaultChecked={item.books.find(item => item.googleId === props.bookId) ? true : false}>{item.shelfName}</Checkbox>
			))}
			<p>+ Create new shelf</p>
      	</div>
    );
};

const mapStateToProps = state => {
	return {
		userBooksOnShelves: state.shelf.userBooksOnShelves,
		userBooks: state.library.userBooks,
		currentBook: state.book.currentBook
	};
};

export default connect(mapStateToProps, { addToCustomShelf, deleteFromCustomShelf, getUserShelves, getBooksOnShelves })(AddToExistingShelf)