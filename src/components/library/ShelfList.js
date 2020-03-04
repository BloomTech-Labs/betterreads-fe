import React from 'react';
import ShelfNote from '../common/ShelfNote';
import ShelfItem from './ShelfItem';

const ShelfList = props => {
	return (
		<>
			<ShelfNote type="allbooks" count={props.count} />
			{/* {props.bookList &&
				props.bookList.map((book, index) => (
					<ShelfItem key={index} book={book} />
				))} */}
		</>
	);
};

export default ShelfList;
