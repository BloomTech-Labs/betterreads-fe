import React from 'react';
import BookItem from './BookItems';
import styled from 'styled-components';
import ShelfNote from '../common/ShelfNote';

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;

	.breaker{
		display: none;
	}

	@media (min-width: 1120px) {
		width: 90%;
		margin: 0 auto;
		
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 52px;

		.breaker{
			display: block;
			flex-basis: 100%;
			height: 0;
		}
    }
`;

const BookList = props => {
	return (
		<>
			<ListContainer>
				{
					!props.fetching &&
					props.bookList &&
					props.bookList.map((book, index) => (
						<>
							<BookItem key={index} book={book} />
							{
								index % 2 > 0 && <div className="breaker">&nbsp;</div>
							}
						</>
					))}
			</ListContainer>
		</>
	);
};

export default BookList;