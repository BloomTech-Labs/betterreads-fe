import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Event } from '../tracking/';
import { Row, Col, Button, Icon, Rate, Select } from 'antd';

import styled from 'styled-components';

import { saveBookToLibrary } from '../../actions';

// const apiURL = "http://localhost:5000/api";

const Wrapper = styled.div`
	.ant-row-flex {
		padding: 1.5rem 0;
		border-bottom: 1px solid #cecece;
	}

	.smallThumbnail {
		border-radius: 5px 5px 0 0;
		width: 135px;
		height: auto;
	}

	.ant-btn {
		color: #f7f7f7;
		width: 125px;
		background: #d24719;
		border: none;
		border-radius: 0 0 5px 5px;
	}

	.bookDetail {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.ant-select-selection {
			border: 0 rgba(0, 0, 0, 0);
			background-color: rgba(0, 0, 0, 0);
		}

		.ant-select-selection__rendered {
			margin-left: 0;
		}
	}
`;

const SearchItem = props => {
	const { id, selfLink, volumeInfo, accessInfo, searchInfo } = props.book;

	const saveBookToLibrary = book => {
		Event(
			'Search',
			'User added a book library from search list.',
			'SEARCH_RESULT'
		);

		const modifiedBook = {
			book: {
				googleId: book.id,
				title: book.volumeInfo.title,
				author: book.volumeInfo.authors[0],
				publisher: book.volumeInfo.publisher,
				publishDate: book.volumeInfo.publishedDate,
				description: 'book.volumeInfo.description',
				// isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
				// isbn13: book.volumeInfo.industryIdentifiers[1].identifier,
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

		props.saveBookToLibrary(1, book.id, modifiedBook);
	};

	return (
		<Wrapper>
			<Row
				type="flex"
				justify="center"
				gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
			>
				<Col xs={9}>
					{volumeInfo.imageLinks && (
						<Link
							to={`/Book/${id}`}
							onClick={() =>
								Event(
									'Book',
									'User clicked for book details',
									'SEARCH_RESULTS'
								)
							}
						>
							<div
								style={{
									height: '123px',
									width: '125px',
									overflow: 'hidden'
								}}
							>
								<img
									className="smallThumbnail"
									src={volumeInfo.imageLinks.smallThumbnail}
									alt={`${volumeInfo.title} thumbnail`}
									width="125"
								/>
							</div>
						</Link>
					)}
					<Button onClick={() => saveBookToLibrary(props.book)}>
						<Icon type="book" /> Add to Shelf
					</Button>
				</Col>
				<Col xs={13} className="bookDetail">
					<div className="bookTitle fs-16">{volumeInfo.title}</div>
					<div className="bookAuthors">
						{volumeInfo.authors &&
							volumeInfo.authors.map((author, index) => (
								<div key={index}>
									{index === 0 && 'by'} {author}
								</div>
							))}
					</div>
					<div className="bookRating">
						<Rate
							allowHalf
							defaultValue={volumeInfo.averageRating}
						/>
					</div>
					<div className="bookTrack">
						<Select defaultValue="Track this book ">
							<option value="0">To be read</option>
							<option value="1">Finished</option>
							<option value="2">In Progress</option>
						</Select>
					</div>
				</Col>
			</Row>
		</Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults
	};
};

export default connect(mapStateToProps, { saveBookToLibrary })(SearchItem);
