import React from 'react';
import BookItem from './BookItems';
import ShelfNote from './ShelfNote';

const BookList = props => {
	return (
		<>
            <ShelfNote note={`${props.count} results for "${props.query}"`}/>
			{props.bookList &&
				props.bookList.map((book, index) => (
					<>
						<BookItem key={index} book={book} />
					</>
				))}
		</>
	);
};

export default BookList;
