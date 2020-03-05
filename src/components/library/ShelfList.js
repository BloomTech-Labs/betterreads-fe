import React from 'react';
import ShelfNote from '../common/ShelfNote';
import ShelfItem from './ShelfItem';

const ShelfList = props => {
	return (
		<>
			<ShelfNote type="allbooks" count={props.userBooks.length} />
			{props.userBooks &&
				props.userBooks.map((book, index) => (
					<ShelfItem key={index} book={book} />
				))}
		</>
	);
};

export default ShelfList;
