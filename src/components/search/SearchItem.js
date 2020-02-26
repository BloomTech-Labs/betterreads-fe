import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactGA from 'react-ga';
import styled from 'styled-components';

const apiURL = 'http://localhost:5000/api';

const ResultItem = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0.5 1rem;
	padding: 0.5rem;
	border-bottom: 1px solid lightgray;
`;

const ResultHeader = styled.div`
	display: flex;
`;

const ResultThumb = styled.div``;
const ResultTitle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 0.5rem;
`;
const ResultDesc = styled.div``;

const SearchItem = props => {
	const { id, selfLink, volumeInfo, accessInfo, searchInfo } = props.book;

	const saveBookToLibrary = book => {
		ReactGA.event({
			category: 'Search',
			action: 'User added a book library from search list.'
		});
		// props.saveBookToLibrary(1, book.id, book);

		const modifiedBook = {
			book: {
				googleId: book.id,
				title: book.volumeInfo.title,
				author: book.volumeInfo.authors[0],
				publisher: book.volumeInfo.publisher,
				publishDate: book.volumeInfo.publishedDate,
				description: 'book.volumeInfo.description',
				isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
				isbn13: book.volumeInfo.industryIdentifiers[1].identifier,
				pageCount: book.volumeInfo.pageCount,
				categories: book.volumeInfo.categories[0],
				thumbnail: book.volumeInfo.imageLinks.thumbnail,
				smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail,
				language: book.volumeInfo.language,
				webRenderLink: book.accessInfo.webReaderLink,
				textSnippet: book.searchInfo.textSnippet,
				isEbook: book.saleInfo.isEbook
			},
			readingStatus: 1
		};

		axios
			.post(
				`http://localhost:5000/api/${localStorage.getItem(
					'user_id'
				)}/library`,
				modifiedBook,
				{ withCredentials: true }
			)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	return (
		<ResultItem link={selfLink}>
			<ResultHeader>
				<ResultThumb>
					{volumeInfo.imageLinks && (
						<Link to={`/Book/${id}`}>
							<img
								src={volumeInfo.imageLinks.smallThumbnail}
								alt={`${volumeInfo.title} thumbnail`}
							/>
						</Link>
					)}
					<div>
						<button onClick={() => saveBookToLibrary(props.book)}>
							Add to Library
						</button>
					</div>
				</ResultThumb>

				<ResultTitle>
					<p>{volumeInfo.title}</p>
					<p>
						by{' '}
						{volumeInfo.authors &&
							volumeInfo.authors.map((author, index) => (
								<span key={index}>{author}</span>
							))}
					</p>
					<p>{volumeInfo.averageRating}</p>
				</ResultTitle>
			</ResultHeader>

			<ResultDesc>
				{searchInfo && <p>{searchInfo.textSnippet}</p>}
				<p>
					<a
						href={accessInfo.webReaderLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						Read online
					</a>
				</p>
			</ResultDesc>
		</ResultItem>
	);
};

export default SearchItem;
