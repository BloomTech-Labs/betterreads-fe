import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Event } from '../tracking/';
import { Button, Rate, Menu, Dropdown, notification } from 'antd';

import { saveBookToLibrary } from '../../actions'

import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';

import BookIcon from './BookIcon';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;

    .ant-dropdown-menu {
        z-index: 1001;
    }

    .betterReadsOrange {background: #D24719;}
    .betterReadsGreen{background-color: #547862;}

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

    @media (min-width: 1120px) {
        width: 45%;
        margin: 0 18px 0 0;
    }
`;

const ThumbContainer = styled.div`
    border-radius: 5px 0 0;
    height: 95px;
    width: 82px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
`;

const BookItem = props => {
    const { id, selfLink, volumeInfo, accessInfo, searchInfo } = props.book;
    const [favorite, setFavorite] = useState((localStorage.get('favorites').find(googleId => googleId === props.id) ? true : false));
    const [readingStatus, setReadingStatus] = useState();
    const [trackBtnLabel, setTrackBtnLabel] = useState('Track this');

    const firstRun = useRef(true);
    useEffect(() => {
        if(firstRun.current){
            firstRun.current = false;
            return;
        }

        // Record google analytics event when a book is favorited
        Event(
			'Search',
			(favorite ? 'User added a book to favorites from search list.' : 'User removed a book from favorites on search list.' ),
			'SEARCH_RESULT'
		);        

        notification.open({
            type: (favorite ? 'success' : 'info'),
            message: 'Success',
            description: (favorite ? 'Book added to favorites.' : 'Book removed from favorites.'),
            duration: 1.5
        });
        // (userId, googleId, book Object, reading status, favorite)
        props.saveBookToLibrary(localStorage.getItem('id'), props.book.id, props.book, 1, favorite);
    }, [favorite])

    const firstRunStatus = useRef(true);
    useEffect(() => {
        if(firstRunStatus.current){
            firstRunStatus.current = false;
            return;
        }
        
        Event(
			'Search',
			'User added a book with a reading status',
			'SEARCH_RESULT'
        );
        // (userId, googleId, book Object, reading status, favorite)
        props.saveBookToLibrary(localStorage.getItem('id'), props.book.id, props.book, readingStatus, null);
    }, [readingStatus])

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
        
    }

    const TrackMenu = (
        <Menu onClick={key => readingStatusUpdate(key)}>
            <Menu.Item key="80" value="1">To read</Menu.Item>
            <Menu.Item key="71" value="2">In Progress</Menu.Item>
            <Menu.Item key="62" value="3">Finished</Menu.Item>
        </Menu>
    )

	// const saveBookToLibrary = book => {
	// 	Event(
	// 		'Search',
	// 		'User added a book library from search list.',
	// 		'SEARCH_RESULT'
	// 	);

    //     // (userId, googleId, book Object)
    //     props.saveBookToLibrary(localStorage.getItem('user_id'), book.id, props.book, readingStatus, favorite);
    // }
    
    return (
        <Wrapper id={id}>
            <div className="flexer">
                <div className="imgContainer">
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}>
                            <ThumbContainer bgImage={volumeInfo.imageLinks.smallThumbnail} />
                        </Link>
                    )}
                    <Dropdown overlay={TrackMenu} trigger={['click']}>
                        <Button className={(trackBtnLabel === 'Track this' ? 'betterReadsOrange' : 'betterReadsGreen')}>{trackBtnLabel} <DownOutlined /></Button>
                    </Dropdown>
                </div>
                <div className="bookDetail openSans">
                    <div className="bookTitle fs-16 fw-600">{volumeInfo.title}</div>
                    <div className="bookAuthors fs-16 openSans lh-22">
                        {
                            volumeInfo.authors &&
                            volumeInfo.authors.map((author, index) => (
                                <div key={index} data-key={index}>
                                    { index === 0 && 'by' } {author}
                                </div>
                            ))
                        }
                    </div>
                    <div className="bookRating">
                        <Rate allowHalf defaultValue={volumeInfo.averageRating} />
                    </div>
                </div>
                <div className="bookFav">
                    {   favorite
                        ? <HeartFilled onClick={() => setFavorite(!favorite)} /> 
                        : <HeartOutlined onClick={() => setFavorite(!favorite)} />
                    }
                    
                </div>
            </div>
        </Wrapper>
    );

};

export default connect(null, {saveBookToLibrary})(BookItem);
