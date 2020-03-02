import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { Row, Col, Button, Icon, Rate, Select } from 'antd';
import styled from 'styled-components';
import { saveBookToLibrary } from '../../actions';

const Wrapper = styled.div`

	.ant-row-flex {
		padding: 1 rem;
		display: flex;
		justify-content: space-around;

		border-bottom: 1px solid #cecece;
		.ant-col {
			width: 43%;
		}
	}

	.largeThumbnail {
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
`
const GenreBox = styled.div`
background: rgba(196, 196, 196, 0.5);
border-radius: 5px;
width: 100%;

`

export function BookDetails(props) {
	const [selectedBook, setSelectedBook] = useState();

	const results = {
		searchResults: {
			items: [
				{
					id: 'Gz1jn_5OafMC',
					volumeInfo: {
						title: "Wizard's First Rule",
						authors: ['Terry Goodkind'],
						catagories: ['Fiction'],
						imageLinks: [
							{
								thumbnail:
									'http://books.google.com/books/content?id=Gz1jn_5OafMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
							}
						]
					}
				}
			]
		}
	};

	useEffect(() => {
		setSelectedBook(
			props.searchResults.items
				? props.searchResults.items.find(
						book => book.id === props.match.params.id
				  )
				: results.searchResults.items.find(
						book => book.id === results.searchResults.items.id
				  )
		);
	}, []);

	const saveBookToLibrary = book => {
		console.log(book, "book")
		Event(
			'bookDetail',
			'User added a book library from book details.',
			'BOOK_DETAILS'
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
	
	console.log(selectedBook, 'selected book');
	return (
		<>
			{selectedBook && (
				<Wrapper>
					<Row
						type="flex"
						justify="center"
						gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
					>
						<Col xs={9}>
							<div
								style={{
									height: '201px',
									width: '135px',
									overflow: 'hidden'
								}}
							>
								<img
									className="largeThumbnail"
									src={
										selectedBook.volumeInfo.imageLinks
											.thumbnail
									}
									alt={`${selectedBook.volumeInfo.title} thumbnail`}
									width="135"
								/>
							</div>

							<Button
								onClick={() => saveBookToLibrary(selectedBook)}
							>
								<Icon type="book" /> Add to Shelf
							</Button>
						</Col>
						<Col xs={13} className="bookDetail">
							<div className="bookTitle fs-16">
								{selectedBook.volumeInfo.title}
							</div>
							<div className="bookAuthors">
								{selectedBook.volumeInfo.authors &&
									selectedBook.volumeInfo.authors.map(
										(author, index) => (
											<div key={index}>
												{index === 0 && 'by'} {author}
											</div>
										)
									)}
							</div>
							<div className="bookRating">
								<Rate
									allowHalf
									defaultValue={
										selectedBook.volumeInfo.averageRating
									}
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
					<Row
						type="flex"
						justify="center"
						gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
					>
						<p>{selectedBook.volumeInfo.description}</p>
						<GenreBox>
                        <p>
							Genre
							{selectedBook.volumeInfo.categories.map(G => (
								<p key={G.id}>{G}, </p>
							))}</p>
						</GenreBox>
                       
					</Row>
				</Wrapper>
			)}
		</>
	);
}

const mapStateToProps = state => {
	return {
		searchResults: state.search.searchResults,
		error: state.search.error,
		fetching: state.search.fetching
	};
};

export default connect(mapStateToProps, { saveBookToLibrary })(BookDetails);
