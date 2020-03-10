import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { notification, Button, Rate, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { saveBookToLibrary } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from './Breadcrumbs';

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import ShelfContainer from '../common/ShelfContainer';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
.frank{font-family: 'Frank Ruhl Libre', serif;}
.openSans{font-family: 'Open Sans', sans-serif;}
.fs-16{font-size: 16px;}
.fs-32{font-size: 32px;}

.pb-12{padding-bottom: 12px;}
.pb-16{padding-bottom: 16px;}

.betterReadsOrange {background: #D24719;}
	.betterReadsGreen{background-color: #547862;}
	
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
                color: #F7F7F7;
                width: 82px;
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
	@media (min-width: 1120px) {

		.somethingClever{
			width: 1120px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			
			.flexer{
				width: 74%;
				margin-top 24px;
				
				.top{
					width: 90%;
					margin: 10px 0;
				}
				.bookDeets{
					margin: 10px 0;
   					width: 90%;
				}
			}
			.shelf {
				width: 26%;
			}


}
		.spinnerContainer {
			width: 90%;
			height: 100vh;

			margin-top: 4rem;
		}
    }
`;

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

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
	const { bookId } = props.match.params.id;
	const [selectedBook, setSelectedBook] = useState();
	const [favorite, setFavorite] = useState(false);
	const [readingStatus, setReadingStatus] = useState();
	const [trackBtnLabel, setTrackBtnLabel] = useState('Track this');

	const firstRun = useRef(true);
	useEffect(() => {
		if (firstRun.current) {
			firstRun.current = false;
			return;
		}

		// Record google analytics event when a book is favorited
		Event(
			'Book Details',
			favorite
				? 'User added a book to favorites from book details.'
				: 'User removed a book from favorites on search list.',
			'BOOK_DETAILS'
		);

		notification.open({
			type: favorite ? 'success' : 'info',
			message: 'Success',
			description: favorite
				? 'Book added to favorites.'
				: 'Book removed from favorites.',
			duration: 1.5
		});
		props.saveBookToLibrary(
			localStorage.getItem('id'),
			selectedBook.id,
			selectedBook,
			readingStatus,
			favorite
		);
	}, [favorite]);

	const firstRunStatus = useRef(true);
	useEffect(() => {
		if (firstRunStatus.current) {
			firstRunStatus.current = false;
			return;
		}

		Event(
			'Search',
			'User added a book with a reading status',
			'SEARCH_RESULT'
		);
		props.saveBookToLibrary(
			localStorage.getItem('id'),
			selectedBook.id,
			selectedBook,
			readingStatus,
			favorite
		);
	}, [readingStatus]);

	const readingStatusUpdate = key => {
		// Send book to library and add reading status
		setReadingStatus(key.item.props.value);
		setTrackBtnLabel(key.item.props.children);
		notification.open({
			type: 'info',
			message: 'Success',
			description: 'You are now tracking a book',
			duration: 1.5
		});
	};

	const TrackMenu = (
		<Menu onClick={key => readingStatusUpdate(key)}>
			<Menu.Item key="80" value="1">
				To read
			</Menu.Item>
			<Menu.Item key="71" value="2">
				In Progress
			</Menu.Item>
			<Menu.Item key="62" value="3">
				Finished
			</Menu.Item>
		</Menu>
	);

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

	console.log(props, 'props');

	useEffect(() => {
		setSelectedBook(
			(props.searchResults.books.items &&
				props.searchResults.books.items.find(
					book => book.id === props.match.params.id
				)) ||
				(results.searchResults.books.items &&
					results.searchResults.books.items.find(
						book => book.id === results.searchResults.items.id
					))
		);
	}, []);

	const ThumbContainer = styled.div`
		height: 95px;
		width: 82px;
		background-image: url(${props => props.bgImage});
		background-size: cover;
		border-radius: 5px 0 0;
	`;

	console.log(selectedBook, 'selected book');

	return (
		<>
			{selectedBook && (
				<div>
					<Header />
					<SearchForm history={props.history} />
					<Breadcrumbs
						history={props.history}
						crumbs={[
							{ label: 'Search', path: '/search' },
							{ label: 'Book Detail', path: null }
						]}
					/>
					{props.fetching && (
						<div className="spinnerContainer">
							<Spin indicator={antIcon} />
						</div>
					)}
					<Wrapper id={bookId}>
						<div className="somethingClever">
							<div className="flexer">
								<div className="top">
									<div className="imgContainer">
										<ThumbContainer
											bgImage={
												selectedBook.volumeInfo
													.imageLinks.thumbnail
											}
										/>

										<Dropdown
											overlay={TrackMenu}
											trigger={['click']}
										>
											<Button
												className={
													trackBtnLabel ===
													'Track this'
														? 'betterReadsOrange'
														: 'betterReadsGreen'
												}
											>
												{trackBtnLabel} <DownOutlined />
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
															{index === 0 &&
																'by'}{' '}
															{author}
														</div>
													)
												)}
										</div>
										<div className="bookRating">
											<Rate
												allowHalf
												defaultValue={
													selectedBook.volumeInfo
														.averageRating
												}
											/>
										</div>
									</div>
									<div className="bookFav">
										{favorite ? (
											<HeartFilled
												onClick={() =>
													setFavorite(!favorite)
												}
											/>
										) : (
											<HeartOutlined
												onClick={() =>
													setFavorite(!favorite)
												}
											/>
										)}
									</div>
								</div>
								<div className="bookDeets">
									<p>{selectedBook.volumeInfo.description}</p>
									<div className="genre">
										<p>Genre</p>
									</div>
									<div>
										{selectedBook.volumeInfo.categories &&
											selectedBook.volumeInfo.categories.map(
												G => (
													<GenreBox key={G.id}>
														{G}{' '}
													</GenreBox>
												)
											)}
								
									</div>
								</div>
							</div>
							<div className="shelf">
							<ShelfContainer history={props.history} />
							</div>
						</div>
					</Wrapper>
				</div>
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
