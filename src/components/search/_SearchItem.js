import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Event } from '../tracking';
import { Row, Col, Button, Icon, Rate, Select, Menu, Dropdown } from 'antd';

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';

import BookIcon from '../common/BookIcon';
import styled from 'styled-components';

import { saveBookToLibrary } from '../../actions';

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;

    .frank{font-family: 'Frank Ruhl Libre', serif;}
    .openSans{font-family: 'Open Sans', sans-serif;}
    
    .fs-13{font-size: 13px;}
    .fs-14{font-size: 14px;}
    .fs-16{font-size: 16px;}

    .fw-600{font-weight: 600;}
    .fw-bold{font-wieght: bold;} 

    .lh-20{line-height: 20px;}
    .lh-22{line-height: 22px;}

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

const ThumbContainer = styled.div`
    height: 95px;
    width: 82px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
`;

const SearchItem = props => {
    const { id, selfLink, volumeInfo, accessInfo, searchInfo } = props.book;
    const [favorite, setFavorite] = useState(false);

    const TrackMenu = (
        <Menu onClick={() => saveBookToLibrary(props.book)}>
            <Menu.Item key="1" value="0">To be read</Menu.Item>
            <Menu.Item key="2" value="1">Finished</Menu.Item>
            <Menu.Item key="3" value="2">In Progress</Menu.Item>
        </Menu>
    )

    const markAsFavorite = (id) => {
        setFavorite(!favorite);
    }

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
    }
    
    return (
        <Wrapper id={id}>
            <div className="flexer">
                <div className="imgContainer">
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}>
                            <ThumbContainer bgImage={volumeInfo.imageLinks.smallThumbnail} />
                        </Link>
                    )}
                    <Dropdown overlay={TrackMenu}>
                        <Button>Track this <DownOutlined /></Button>
                    </Dropdown>
                </div>
                <div className="bookDetail openSans">
                    <div className="bookTitle fs-16 fw-600">{volumeInfo.title}</div>
                    <div className="bookAuthors fs-16 openSans lh-22">
                        {
                            volumeInfo.authors &&
                            volumeInfo.authors.map((author, index) => (
                                <div key={index}>
                                    { index === 0 && 'by' } {author}</div>
                            ))
                        }
                    </div>
                    <div className="bookRating">
                        <Rate allowHalf defaultValue={volumeInfo.averageRating} />
                    </div>
                </div>
                <div className="bookFav">
                    {   favorite
                        ? <HeartFilled onClick={() => markAsFavorite(id)} /> 
                        : <HeartOutlined onClick={() => markAsFavorite(id)} />
                    }
                    
                </div>
            </div>
        </Wrapper>
    );

};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults
	};
};

export default connect(mapStateToProps, {saveBookToLibrary})(SearchItem);
{/* <Button onClick={() => saveBookToLibrary(props.book)} className="openSans fs-13 fw-600">
                            Track this <DownOutlined />
                        </Button> */}
