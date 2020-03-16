import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Event } from '../tracking/';
import { Button, Rate, Menu, Dropdown, notification, DatePicker } from 'antd';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import moment from 'moment';
import {
	fetchUsersBooks,
	fetchUsersShelves,
    getGoogleResults,
    deleteUserBook,
    addBookToUserLibrary,
    updateBookFavorite,
    updateBookReadingStatus,
    moveBookFromShelf
} from '../../actions/index';

import styled from 'styled-components';

import { updateBookItem, updateDates, sendUpTheFlares } from '../helpers';

const BookContainer = styled.div`
    width: 90%;
    margin: ${props => props.source === 'search' ? '0 auto' : '8px auto'};
    display: flex;
    // justify-content: space-between;

    border-bottom: ${props => props.source === 'search' ? '1px solid #cecece' : ''};
    border: ${props => props.source === 'library' ? '1px solid #cecece' : ''};
    border-radius: ${props => props.source === 'library' ? '4px' : ''};
    
    padding: ${props => props.source === 'search' ? '16px 0' : ''};
    

    font-family: 'Open Sans', sans-serif;

    .betterReadsOrange {background: #D24719;}
    .betterReadsGreen{background-color: #547862;}

    .fs-13{font-size: 13px;}
    .fs-14{font-size: 14px;}
    .fs-16{font-size: 16px;}

    .fw-600{font-weight: 600;}
    .fw-bold{font-wieght: bold;} 

    .lh-20{line-height: 20px;}
    .lh-22{line-height: 22px;}



    .thumbContainer{
        .thumbnail{
            border-radius: 5px 0 0;
            height: 112px;
            width: 82px;
            background-image: url(${props => props.bgImage});
            background-size: cover;
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

    .book{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        padding: 12px 8px;

        .bookDetail{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .titleAuthor {

                .title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                }
            }

            .bookFav{
                .anticon-heart svg{
                    height: 26px;
                    width: 29px;
                    color: #D24719;
                }
            }
        }

        .calendars {
            display: flex;

            .input{
                display: flex;
                flex-direction: column;
                min-width: 50%;
                max-width: 100px;
                // width: 50%;

                .dateLabel {
                    margin-bottom: 0;
                    font-family: Open Sans;
                    font-weight: bold;
                    font-size: 0.625rem;
                }
            }

            .input:first-child {
                border-right: 1px solid #bfbfbf;
            }

            .input:last-child {
                padding-right: 0;
                padding-left: 8px;
            }

            .ant-calendar-picker-input {
                height: 16px;
                padding: 0;
                background-color: #fff;
                border: none;
            }
        }
        
    }

    @media (min-width: 1120px) {
        width: ${props => props.conWidth} || '336px';
        // margin: 8px 0 8px 0;

        .and-calendar-picker-input{
            
        }
    }
`;

const BookItem = props => {
    const { googleId } = props.book;
    const [libraryBook, setLibraryBook] = useState(props.userBooks.find(b => b.googleId === googleId) || null);
    const [inLibrary, setInLibrary] = useState(libraryBook !== null ? true : false);
    const [favorite, setFavorite] = useState(libraryBook !== null && libraryBook.favorite ? true : false);
    const [readrrId, setReadrrId] = useState(libraryBook !== null ? libraryBook.bookId : null);
    const [dateStarted, setDateStarted] = useState(libraryBook !== null ? libraryBook.dateStarted : null);
    const [dateEnded, setDateEnded] = useState(libraryBook !== null ? libraryBook.dateEnded : null);
    const [readingStatus, setReadingStatus] = useState(inLibrary ? parseInt(libraryBook.readingStatus) : null);
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

        updateBookItem(localStorage.getItem('id'), readrrId, inLibrary, props.book, actionType, favorite, parseInt(readingStatus))
            .then(results => {
                let newBookId;
                if(results.config.method === 'post') {
                    // Add book to library
                    newBookId = results.data.bookId;
                    props.addBookToUserLibrary(results.data);
                    setLibraryBook(results.data)
                    setReadrrId(results.data.bookId)
                    setInLibrary(true)
                }
                // Analytics Event action
                if(actionType === 'favorite') {
                    // favorite update
                    props.updateBookFavorite(newBookId || readrrId);
                    Event('TRACKING', (favorite ? 'User added a book to favorites from search list.' : 'User removed a book from favorites on search list.' ),'BOOK_CARD');
                    sendUpTheFlares('success', 'Success', (favorite ? 'Book added to favorites.' : 'Book removed from favorites.'));
                }else if(actionType === 'readingStatus' && readingStatus < 4){
                    // reading status update
                    props.updateBookReadingStatus(newBookId || readrrId, parseInt(readingStatus));
                    // only move book if not in allbooks
                    if(props.history.location.pathname !== '/shelf/allbooks' && props.history.location.pathname !== '/shelf/favorites'){
                        props.moveBookFromShelf(newBookId || readrrId, parseInt(readingStatus))
                    }
                    Event('TRACKING', 'User added a book to start tracking from search list.', 'BOOK_CARD');
                    sendUpTheFlares('success', 'Success', 'Reading status has been updated.');
                }else{
                    //delete
                    props.deleteUserBook(readrrId);
                    props.moveBookFromShelf(newBookId || readrrId, parseInt(readingStatus))
                    Event('TRACKING', 'User deleted a book from library.', 'BOOK_CARD');
                    sendUpTheFlares('success', 'Success', 'Book deleted from your library.')
                }
            })
            .catch(err => {
                Event('Search', 'Error tracking/favoriting/deleting a book.', 'BOOK_CARD');
                sendUpTheFlares('warning', 'Success', 'There was an error tracking a book.');
            });
        
    }, [favorite, readingStatus]);

    useEffect(() => {
        if(readingStatus === 1){
            setTrackBtnLabel('To read');
        }else if(readingStatus === 2){
            setTrackBtnLabel('In progress');
        }else if(readingStatus === 3){
            setTrackBtnLabel('Finished');
        }else{
            setTrackBtnLabel('Track this');
        }
    }, []);

    const readingStatusUpdate = key => {
        setReadingStatus(key.item.props.value);
        setTrackBtnLabel(key.item.props.children);
    }

    const handleDates = (date, dateString, whichDate) => {
        updateDates(localStorage.getItem('id'), readrrId, dateString, whichDate)
            .then(result => {
                setDateStarted(result.data.dateStarted.split('T')[0])
                setDateEnded(result.data.dateEnded.split('T')[0])
            })
            .catch(err => console.log(err))
    }

    const searchMenu = (
        <Menu onClick={key => readingStatusUpdate(key)}>
            <Menu.Item key="1" value="1">To read</Menu.Item>
            <Menu.Item key="2" value="2">In Progress</Menu.Item>
            <Menu.Item key="3" value="3">Finished</Menu.Item>
        </Menu>
    )
   
    const libraryMenu = (
        <Menu onClick={key => readingStatusUpdate(key)}>
            <Menu.Item key="1" value="1">To read</Menu.Item>
            <Menu.Item key="2" value="2">In Progress</Menu.Item>
            <Menu.Item key="3" value="3">Finished</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="4" value="4">Delete</Menu.Item>
        </Menu>
    )

	return (
		<BookContainer data-book={props.book.googleId} conWidth="100%" conHeight="143px" bgImage={props.book.thumbnail || props.book.smallThumbnail} source={props.source}  data-library={inLibrary}>
			<div className="thumbContainer">
                <Link to={`/book/${googleId}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}>
				    <div className="thumbnail"></div>
                </Link>
				<Dropdown overlay={props.source === 'search' ? searchMenu : libraryMenu} trigger={['click']}>
                    <Button className={(trackBtnLabel === 'Track this' ? 'betterReadsOrange' : 'betterReadsGreen')}>{trackBtnLabel} <DownOutlined /></Button>
                </Dropdown>
			</div>
			<div className="book">
				<div className="bookDetail">
					<div className="titleAuthor">
                        <div className="title fs-16 fw-600">{props.book.title}</div>
                        <div className="author fs-16">
                            
                            {props.book.authors && props.book.authors.split(',')[0]}
                        </div>
                    </div>
					<div className="bookFav">
                        {   favorite
                            ? <HeartFilled onClick={() => setFavorite(!favorite)} /> 
                            : <HeartOutlined onClick={() => setFavorite(!favorite)} />
                        }
                    </div>
				</div>
				{
                    props.source === 'library' &&
                    <div className="calendars">
                        <div className="input">
                            <div className='dateLabel'>DATE STARTED</div>
                            <DatePicker placeholder='Started' defaultValue={dateStarted !== null ? moment(dateStarted, 'YYYY-MM-DD') : null} onChange={(date, dateString) => handleDates(date, dateString, 0)} />
                        </div>

                        <div className="input">
                            <div className='dateLabel'>DATE ENDED</div>
                            <DatePicker placeholder='Ended' defaultValue={dateEnded !== null ? moment(dateEnded, 'YYYY-MM-DD') : null} onChange={(date, dateString) => handleDates(date, dateString, 1)} />
                        </div>
                    </div>
				}
				{
					props.source === 'search' &&
					<Rate allowHalf disabled defaultValue={props.book.averageRating} />
				}
                {/* <Rate allowHalf disabled defaultValue={Math.floor(Math.random() * (5)) + 1} /> */}
			</div>
		</BookContainer>
	)
}

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		userShelves: state.library.userShelves
	};
};

export default connect(mapStateToProps, {
	fetchUsersBooks,
	fetchUsersShelves,
    getGoogleResults,
    deleteUserBook,
    addBookToUserLibrary,
    updateBookFavorite,
    updateBookReadingStatus,
    moveBookFromShelf
})(BookItem);