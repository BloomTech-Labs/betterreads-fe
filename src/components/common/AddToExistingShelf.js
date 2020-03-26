import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteFromCustomShelf, addToCustomShelf, getUserShelves, getBooksOnShelves, addBookToUserLibrary } from '../../actions';
import { Checkbox, Collapse } from 'antd';
import CreateNewShelfModal from './CreateNewShelfModal';
import styled from 'styled-components';
import { Event } from '../../utils/tracking';
import { sendUpTheFlares } from '../../utils/helpers'

const ShelfContainer = styled.div`
	.ant-collapse {
		background-color: transparent;

		.ant-collapse-item{border-bottom: none;}
		.ant-collapse-header {
			font-size: 1rem;
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-weight: 700;
			padding: 12px 0 !important;
			color: #4E4C4A;
		}

		.ant-collapse-content-box {
			padding: 0;

			.ant-checkbox-wrapper{
				display: block;
				margin: 8px 0 !important;
			}
		}
	}
`;

const AddToExistingShelf = props => {
	const onChange = event => {
		const book = props.userBooksOnShelves.find(item => item.shelfId === event.target.name).books.find(item => item.googleId === props.bookId);
		if (event.target.checked === true) {
			props.addBookToUserLibrary(props.currentBook);
			props.addToCustomShelf(props.currentBook, event.target.name);
			sendUpTheFlares('success', 'Success', 'Book has been added to your shelf.');
			Event('SHELF', 'User added a book to a shelf', 'ADD_TO_SHELF');
		} else {
			props.deleteFromCustomShelf(book.bookId, event.target.name);
			sendUpTheFlares('warning', 'Success', 'Book has been deleted from your shelf.');
			Event('SHELF', 'User removed a book from a shelf', 'ADD_TO_SHELF');

		};
	};

    return (
		<ShelfContainer>
			<Collapse defaultActiveKey={1} bordered={false} expandIconPosition="right">
				<Collapse.Panel header={`Shelves (${props.userBooksOnShelves.length})`} showArrow={true} key={0}>
					{props.userBooksOnShelves && props.userBooksOnShelves.map((item, index) => (<Checkbox key={index} name={item.shelfId} onChange={onChange} defaultChecked={item.books.find(item => item.googleId === props.bookId) ? true : false}>{item.shelfName}</Checkbox>))}
					<CreateNewShelfModal history={props.history} />
				</Collapse.Panel>
			</Collapse>
		</ShelfContainer>
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