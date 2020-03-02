import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { Row, Col, Button, Icon, Rate, Select, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { saveBookToLibrary } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';

const Wrapper = styled.div`


.frank{font-family: 'Frank Ruhl Libre', serif;}
.openSans{font-family: 'Open Sans', sans-serif;}
.fs-16{font-size: 16px;}
.fs-32{font-size: 32px;}

.pb-12{padding-bottom: 12px;}
.pb-16{padding-bottom: 16px;}

	.innerWrapper{
		
		margin: 0 auto;
		background-color: #F3F6F5;
padding: 16px 0;
margin: 0 0 8px 0;
	}
    .flexer{
        display: flex;
        border-bottom: 1px solid #cecece;
        padding: 16px 0;

        &:first-child {
            padding-right: 12px;
        }

        .anticon-heart svg{
            height: 26px;
            width: 29px;
            color: #D24719;
        }

        .imgContainer{
            margin-right: 16px; 

            .thumbContainer{
                width: 125px;
                height: 198px;
                overflow: hidden;
                
                .smallThumbnail {
                    border-radius: 5px 5px 0 0;
                    width: 135px;
                    height: auto;
                }
            }
    
            .ant-btn {
                color: #F7F7F7;
                width: 82px;
                background: #D24719;
                border: none;
                border-radius: 0 0 0 5px;
                font-size: 13px;
                font-weight: 600;
                line-height: 20px;
                padding: 0 3px;
        
                .anticon-down{
                    margin-left: 2px;
                }

                svg {
                    margin-right: 4px;
                }
            }
        }
    
        .bookDetail {
            display: flex;
            flex-direction: column;
            
            .bookTitle{
                line-height: 22px
                margin-bottom: 12px;
            }

            .ant-select-selection {   
                background-color: rgba(0,0,0,0);
            }

            .bookRating{
                .anticon-star svg {
                    height: 16px;
                    width: 16px;
                }
            }
        }

        .bookFav {
            margin-left: auto;
        }
    }
`;
const GenreBox = styled.div`
	background: #547862;
	border-radius: 4px;
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
	display: flex;
	align-items: center;

	color: #ffffff;
`;

export function BookDetails(props) {
	const [selectedBook, setSelectedBook] = useState();
	const [favorite, setFavorite] = useState(false);

	const TrackMenu = (
		<Menu onClick={() => saveBookToLibrary(props.book)}>
			<Menu.Item key="1" value="0">
				To be read
			</Menu.Item>
			<Menu.Item key="2" value="1">
				Finished
			</Menu.Item>
			<Menu.Item key="3" value="2">
				In Progress
			</Menu.Item>
		</Menu>
	);

	const markAsFavorite = id => {
		setFavorite(!favorite);
	};

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

	const ThumbContainer = styled.div`
		height: 95px;
		width: 82px;
		background-image: url(${props => props.bgImage});
		background-size: cover;
	`;

	const saveBookToLibrary = book => {
		console.log(book, 'book');
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
	console.log(selectedBook);
	const { id } = props.match.params.id;

	return (
		<>
			{selectedBook && (
				<Wrapper id={id}>
					<Header />
					<div className="innerWrapper">
					<SearchForm />
					</div>
					<div className="flexer">
						<div className="imgContainer">
							<ThumbContainer
								bgImage={
									selectedBook.volumeInfo.imageLinks.thumbnail
								}
							/>

							<Dropdown overlay={TrackMenu}>
								<Button>
									Track this <DownOutlined />
								</Button>
							</Dropdown>
						</div>

						<div className="bookDetail openSans">
							<div className="bookTitle fs-16 fw-600">
								{selectedBook.volumeInfo.title}
							</div>
							<div className="bookAuthors fs-16 openSans lh-22">
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
							<div className="bookFav">
								{favorite ? (
									<HeartFilled
										onClick={() => markAsFavorite(id)}
									/>
								) : (
									<HeartOutlined
										onClick={() => markAsFavorite(id)}
									/>
								)}
							</div>
						</div>
					</div>
					<Row
						type="flex"
						justify="center"
						gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
					>
						<p>{selectedBook.volumeInfo.description}</p>
						<div>
							<p>
								Genre
								{selectedBook.volumeInfo.categories.map(G => (
									<GenreBox key={G.id}>{G}, </GenreBox>
								))}
							</p>
						</div>
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
