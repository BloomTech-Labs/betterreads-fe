import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { Row, Col, Button, Icon, Rate, Select, Menu, Dropdown, Breadcrumb } from 'antd';
import styled from 'styled-components';
import { saveBookToLibrary } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from "./Breadcrumbs"

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';


const HeaderWrapper = styled.div`
	margin: 0 auto;

	.innerWrapper {
		background-color: #f3f6f5;
		padding: 16px 0;
		margin: 0 0 8px 0;

		.form {
			width: 90%;
			margin: 0 auto;
		}
	}
`;

const Wrapper = styled.div`


.frank{font-family: 'Frank Ruhl Libre', serif;}
.openSans{font-family: 'Open Sans', sans-serif;}
.fs-16{font-size: 16px;}
.fs-32{font-size: 32px;}

.pb-12{padding-bottom: 12px;}
.pb-16{padding-bottom: 16px;}


    .flexer{
		display: flex;
		flex-direction: column;
        padding: 16px 0;
		width: 90%;
		margin: 0 auto;
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
                background: #547862;
				border-radius: 0px 0px 0px 3px;
                width: 82px;
               	border: none;
				font-size: 13px;
                font-weight: 600;
                line-height: 20px;
                padding: 0 3px;
				color: #FFFFFF;
		
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
                line-height: 22px;
                margin-bottom: 12px;
            }

            .ant-select-selection {   
                background-color: rgba(0,0,0,0);
            }

            .bookRating{
				
                .anticon-star svg {
                    height: 16px;
					width: 16px;
					box-sizing: border-box;
                }
            }
        }

        .bookFav {
            margin-left: auto;
		}
		.top{
			display: flex;
			flex-direction: row
			width: 90%;
			padding: 0 0 20px 0;
			border-bottom: 1px solid #cecece;
		}
		.bookDeets{
			
			margin: 16px auto;
			.genre{
			 display: flex;
			 flex-direction: column;
			 font-family: Frank Ruhl Libre;
font-style: normal;
font-weight: bold;
font-size: 20px;
line-height: 30px;
color: #4E4C4A;
			}
		}

    }
`;
const GenreBox = styled.button`
	background: #547862;
	border-radius: 4px;
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
	color: #ffffff;
	width: auto;
	padding: 5px 10px;
	border: none;
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

console.log(props, "props")

	useEffect(() => {
		setSelectedBook(
			props.searchResults.books.items
				&& props.searchResults.books.items.find(
						book => book.id === props.match.params.id
				  )
			||
			results.searchResults.books.items
				&& results.searchResults.books.items.find(
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
				title: book.volumeInfo.title || null,
				author: book.volumeInfo.authors.toString() || null,
				publisher: book.volumeInfo.publisher || null,
				publishDate: book.volumeInfo.publishedDate || null,
				description: 'book.volumeInfo.description',
				isbn10: book.volumeInfo.industryIdentifiers[0].identifier || null,
				isbn13: book.volumeInfo.industryIdentifiers[1].identifier || null,
				pageCount: book.volumeInfo.pageCount || null,
				categories: book.volumeInfo.categories.toString() || null,
				thumbnail: book.volumeInfo.imageLinks || null.thumbnail || null,
				smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail || null,
				language: book.volumeInfo.language || null,
				webRenderLink: book.accessInfo.webReaderLink || null,
				textSnippet: book.searchInfo.textSnippet || null,
				isEbook: book.saleInfo.isEbook || null
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
					
					<HeaderWrapper>
						<Header />
						<div className="innerWrapper">
							<div className="form">
								<SearchForm />
								
							</div>
							
						</div><Breadcrumbs history={props.history} crumbs={[['Search Results','/search'], ['Book Detail','']]}/>
					</HeaderWrapper>

					<div className="flexer">
						<div className="top">
						<div className="imgContainer">
							<ThumbContainer
								bgImage={
									selectedBook.volumeInfo.imageLinks.thumbnail
								}
							/>

							<Dropdown overlay={TrackMenu}>
								<Button>
							track this <DownOutlined />
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
					<div className="bookDeets">
						<p >
							{selectedBook.volumeInfo.description}
						</p>
						<div className="genre">
							<p>
								Genre
								</p>
								</div>
								<div>
								{selectedBook.volumeInfo.categories && selectedBook.volumeInfo.categories.map(G => (
									<GenreBox key={G.id}>{G} </GenreBox>
								))},
							
						</div>
					</div>
					</div>
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
