import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteFromCustomShelf, addToCustomShelf, getUserShelves, getBooksOnShelves, addBookToUserLibrary } from '../../actions';
import { Checkbox } from 'antd';
import CreateNewShelfModalOnPage from '../common/CreateNewShelfModalOnPage';
import styled from 'styled-components';

const AddToContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
	

	.ant-checkbox-wrapper{
		margin-left: 0;
		padding-bottom: 0 0 10px 0;
	}
`

const AddToExistingShelf = props => {
	const onChange = event => {
		const book = props.userBooksOnShelves.find(item => item.shelfId === event.target.name).books.find(item => item.googleId === props.bookId);
		if (event.target.checked === true) {
			props.addBookToUserLibrary(props.currentBook);
			props.addToCustomShelf(props.currentBook, event.target.name);
		} else {
			props.deleteFromCustomShelf(book.bookId, event.target.name);
		};
	};

    return (
      	<AddToContainer>
			<h2>Shelves ({props.userBooksOnShelves.length})</h2>	
			{props.userBooksOnShelves && props.userBooksOnShelves.map((item, index) => (
				<Checkbox key={index} name={item.shelfId} onChange={onChange} defaultChecked={item.books.find(item => item.googleId === props.bookId) ? true : false}>{item.shelfName}</Checkbox>
			))}
			<CreateNewShelfModalOnPage history={props.history} />
      	</AddToContainer>
    );
};

const mapStateToProps = state => {
	return {
		userBooksOnShelves: state.shelf.userBooksOnShelves,
		userBooks: state.library.userBooks,
		currentBook: state.book.currentBook
	};
};

export default connect(mapStateToProps, { addToCustomShelf, deleteFromCustomShelf, getUserShelves, getBooksOnShelves, addBookToUserLibrary })(AddToExistingShelf)