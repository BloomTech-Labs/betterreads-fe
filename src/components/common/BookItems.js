import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Event } from '../tracking/';
import { Button, Rate, Menu, Dropdown, notification } from 'antd';
import axios from 'axios';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import {
	fetchUsersBooks,
	fetchUsersShelves,
	getGoogleResults
} from '../../actions/index';

import BookIcon from './BookIcon';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

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
    //const { id, selfLink, volumeInfo, accessInfo, searchInfo, saleInfo } = props.book;    
    const { googleId } = props.book;
    const [favorite, setFavorite] = useState(props.userBooks.filter(b => b.googleId === googleId).length ? true : false);
    const [readingStatus, setReadingStatus] = useState();
    const [trackBtnLabel, setTrackBtnLabel] = useState('Track this');

    let actionType = null;
    const readingStatusRef = useRef(readingStatus);
    const favoriteRef = useRef(favorite);
    const firstRun = useRef(true);
    useEffect(() => {
        if(firstRun.current){
            firstRun.current = false;
            return;
        }
        // Run if reading status changes
        if(readingStatusRef.current !== readingStatus){
            actionType = 'readingStatus';
            readingStatusRef.current = readingStatus;
        }
        
        // Run if favorite status changes
        if(favoriteRef.current !== favorite){
            actionType = 'favorite';
            favoriteRef.current = favorite;
        }

        // (userId, googleId, book Object, reading status, favorite)
        // props.saveBookToLibrary(localStorage.getItem('id'), actionType, props.book.id, props.book, readingStatus, favorite);
        const modifiedBook = {
            book: {
                googleId: props.book.googleId,
                title: props.book.title || null,
                authors: props.book.authors.toString() || null,
                publisher: props.book.publisher || null,
                publishedDate: props.book.publishedDate || null,
                description: props.book.description || null,
                isbn10: props.book.isbn10 || null,
                isbn13: props.book.isbn13 || null,
                pageCount: props.book.pageCount || null,
                categories: props.book.categories.toString() || null,
                thumbnail: props.book.thumbnail || null,
                smallThumbnail: props.book.smallThumbnail || null,
                language: props.book.language || null,
                webReaderLink: props.book.webReaderLink || null,
                textSnippet: props.book.textSnippet || null,
                isEbook: props.book.isEbook || null
            },
            readingStatus: readingStatus || null,
            favorite: favorite  // true || false
        };
        //{book: props.book, readingStatus: readingStatus || null, favorite}
        axios
            .post(`${API_URL}/api/${localStorage.getItem('id')}/library`, modifiedBook)
            .then(results => {
                // Analytics Event action
                if(actionType === 'favorite') {
                    Event('Search', (favorite ? 'User added a book to favorites from search list.' : 'User removed a book from favorites on search list.' ),'SEARCH_RESULT');
                    sendUpTheFlares('success', 'Success', (favorite ? 'Book added to favorites.' : 'Book removed from favorites.'));
                }else{
                    Event('Search', 'User added a book to start tracking from search list.', 'SEARCH_RESULT');
                    sendUpTheFlares('success', 'Success', 'Reading status has been updated.');
                }
            })
            .catch(err => console.log(err));
    }, [favorite, readingStatus]);

    const sendUpTheFlares = (type, message, description) => {
        notification.open({
            type,
            message,
            description,
            duration: 1.5
        });   
    }

    const readingStatusUpdate = key => {
        setReadingStatus(key.item.props.value);
        setTrackBtnLabel(key.item.props.children);
    }

    const TrackMenu = (
        <Menu onClick={key => readingStatusUpdate(key)}>
            <Menu.Item key="80" value="1">To read</Menu.Item>
            <Menu.Item key="71" value="2">In Progress</Menu.Item>
            <Menu.Item key="62" value="3">Finished</Menu.Item>
        </Menu>
    )
    
    return (
        <Wrapper id={googleId}>
            <div className="flexer">
                <div className="imgContainer">
                    {props.book.smallThumbnail && (
                        <Link to={`/Book/${googleId}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}>
                            <ThumbContainer bgImage={props.book.smallThumbnail} />
                        </Link>
                    )}
                    <Dropdown overlay={TrackMenu} trigger={['click']}>
                        <Button className={(trackBtnLabel === 'Track this' ? 'betterReadsOrange' : 'betterReadsGreen')}>{trackBtnLabel} <DownOutlined /></Button>
                    </Dropdown>
                </div>
                <div className="bookDetail openSans">
                    <div className="bookTitle fs-16 fw-600">{props.book.title}</div>
                    <div className="bookAuthors fs-16 openSans lh-22">
                        {
                            props.book.authors &&
                            props.book.authors.map((author, index) => (
                                <div key={((index+1)*Math.random())} data-key={index}>
                                    { index === 0 && 'by' } {author}
                                </div>
                            ))
                        }
                    </div>
                    <div className="bookRating">
                        <Rate allowHalf defaultValue={props.book.averageRating} />
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

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		userShelves: state.library.userShelves
	};
};

export default connect(mapStateToProps, {
	fetchUsersBooks,
	fetchUsersShelves,
	getGoogleResults
})(BookItem);

//export default BookItem;
