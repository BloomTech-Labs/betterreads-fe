import React from 'react';
import ShelfNote from '../common/ShelfNote';
import ShelfItem from './ShelfItem';
import styled from 'styled-components';

const ShelfListContainer = styled.div`
	max-width: 1120px;
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;

	@media (min-width: 1120px) {
		flex-direction: row;
		flex-wrap: wrap;
	}
`;

const ShelfList = props => {
	return (
		<>
			<ShelfNote type="allbooks" count={props.userBooks.length} />
			<ShelfListContainer>
				{props.userBooks &&
					props.userBooks.map((book, index) => (
						<ShelfItem key={index} book={book} />
					))}
			</ShelfListContainer>
		</>
	);
};

export default ShelfList;
