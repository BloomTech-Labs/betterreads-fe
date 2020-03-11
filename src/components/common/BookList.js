import React from 'react';
// import BookItem from './BookItems';
import BookItem from '../search/_SearchAgain'
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

		// & > div:nth-child(odd) {
		// 	margin: 8px 0;
		// }
		
    }
`;

const BookList = props => {
	console.log(props)
	return (
		<>
			<ListContainer>
				{
					!props.fetching &&
					props.bookList &&
					props.bookList.map((book, index) => (
						<>
							<BookItem key={index} book={book} source="search" />
						</>
					))}
			</ListContainer>
		</>
	);
};

export default BookList;