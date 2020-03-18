import React from 'react';
import BookCard from './BookCard';
import styled from 'styled-components';

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;

	.breaker{
		display: none;
	}

	@media (min-width: 1120px) {		
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 52px;

		.breaker{
			display: block;
			flex-basis: 100%;
			height: 0;
		}

		& > div {
			width: 336px;
		}

		& > div:nth-child(even) {
			margin-right: 0px;
		}

   }
`;

const BookList = props => {
	return (
		<>
			<ListContainer>
				{!props.fetching && props.bookList && props.bookList.map((book, index) => (
					<BookCard key={index} book={book} source="search" />
				))}
			</ListContainer>
		</>
	);
};

export default BookList;