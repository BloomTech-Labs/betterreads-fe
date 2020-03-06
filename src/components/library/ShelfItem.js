import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { saveBookToLibrary } from '../../actions'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Rate, Menu, Dropdown, notification } from 'antd';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { Event } from '../tracking/';

const ShelfItemContainer = styled.div`
    height: 148px;
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    display: flex;

    .thumbnail {
        min-width: 83px;
        height: 100%;
        width: 83px;
        background: url(${props => props.thumbnail});
        background-size: contain;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        display: flex;
        align-items: flex-end;

        .ant-btn {
            width: 100%;
            padding: 0;
            background-color: #547862;
            border: none;
            border-radius: 0;
            border-bottom-left-radius: 4px;
            font-family: 'Open Sans', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #ffffff;

            .anticon {
                margin-left: 4px;
            }
        }
    }

    .information {
        width: 205px;
        padding: 16px;
        
        .title-and-heart {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                width: 100%;
                margin-bottom: 0;
                font-family: 'Opens Sans', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                color: #4e4c4a;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .anticon-heart {
                margin-left: 8px;
                color: #d24719;

                svg {
                    height: 28px;
                    width: 28px;
                }
            }
        }

        .author {
            margin-bottom: 0;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.875rem;
            color: #4e4c4a;
            cursor: pointer;
        }
    }

    @media (min-width: 375px) {
        max-width: 375px;

        .information {
            max-width: 292px;
            width: 292px;

            .title-and-heart {
                .title {
                    width: 184.5px;
                }
            }
        }
    }

    @media (min-width: 414px) {
        max-width: 414px;

        .information {
            max-width: 414px;
            width: 331px;

            .title-and-heart {
                .title {
                    width: 219.59px;
                }
            }
        }
    }

    @media (min-width: 1120px) {
        max-width: 335px;

        .information {
            max-width: 252px;
            width: 252px;
        }
    }
`;

const ShelfItem = props => {
    const [favorite, setFavorite] = useState(false);
    const [readingStatus, setReadingStatus] = useState();
    const [trackBtnLabel, setTrackBtnLabel] = useState('Track');

    // favorite status
    const firstRun = useRef(true);

    useEffect(() => {
        if(firstRun.current){
            firstRun.current = false;
            return;
        }

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

        props.saveBookToLibrary(localStorage.getItem('id'), props.book.id, props.book, 1, favorite);
    }, [favorite]);

    // reading status
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

        props.saveBookToLibrary(localStorage.getItem('id'), props.book.id, props.book, readingStatus, null);
    }, [readingStatus]);

    const readingStatusUpdate = key => {
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
            <Menu.Item key="80" value="1">To be read</Menu.Item>
            <Menu.Item key="71" value="2">In progress</Menu.Item>
            <Menu.Item key="62" value="3">Finished</Menu.Item>
        </Menu>
    );
    // keys?
    
    return (
        <ShelfItemContainer thumbnail={props.book.thumbnail}>
            <div className='thumbnail'>
                <Dropdown overlay={TrackMenu} trigger={['click']}>
                    <Button className={(trackBtnLabel === 'Track this' ? 'betterReadsOrange' : 'betterReadsGreen')}>{trackBtnLabel}<DownOutlined /></Button>
                </Dropdown>
            </div>
            <div className='information'>
                <div className='title-and-heart'>
                    <p className='title' onClick={() => props.history.push(`/shelf/book/${props.book.bookId}`)}>{props.book.title}</p>
                    {favorite ? <HeartFilled onClick={() => setFavorite(!favorite)} /> : <HeartOutlined onClick={() => setFavorite(!favorite)} />}
                </div>
                <p className='author' onClick={() => props.history.push(`/shelf/book/${props.book.bookId}`)}>{props.book.authors.split(',')[0]}</p>
            </div>
        </ShelfItemContainer>
    );

};

export default connect(null, {saveBookToLibrary})(ShelfItem);
