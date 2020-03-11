import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { saveBookToLibrary } from '../../actions'
import styled from 'styled-components';
import { Button, Menu, Dropdown, notification, DatePicker } from 'antd';
import HeartOutlined from '@ant-design/icons/HeartOutlined';
import HeartFilled from '@ant-design/icons/HeartFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { Event } from '../tracking/';

const ShelfItemContainer = styled.div`
    max-width: 288px;
    height: 148px;
    width: 100%;
    margin-bottom: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    display: flex;

    .thumbnail-container {
        min-width: 83px;
        width: 83px;

        .thumbnail {
            height: 117px;
            width: 100%;
            background: url(${props => props.thumbnail});
            background-size: cover;
            border-top-left-radius: 4px;
            cursor: pointer;
        }

        .ant-btn {
            height: 29px;
            width: 100%;     
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
        max-width: 205px;
        width: 205px;
        padding: 16px;
        
        .title-and-heart {
            display: flex;
            justify-content: space-between;

            .title {
                max-width: 129px;
                width: 129px;
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
            margin-bottom: 32px;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.875rem;
            color: #4e4c4a;
            cursor: pointer;
        }

        .calendar {
            display: flex;

            .input {
                max-width: 100px;
                width: 50%;
                padding-right: 8px;
                display: flex;
                flex-direction: column;

                .prompt {
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
                background-color: #f3f6f5;
                border: none;
            }
        }
    }

    @media (min-width: 375px) {
        max-width: 375px;

        .information {
            max-width: 254.5px;
            width: 254.5px;

            .title-and-heart {
                .title {
                    max-width: 178.5px;
                    width: 178.5px;
                }
            }
        }
    }

    @media (min-width: 414px) {
        max-width: 414px;

        .information {
            max-width: 331px;
            width: 331px;

            .title-and-heart {
                .title {
                    max-width: 219.59px;
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

            .title-and-heart {
                .title {
                    max-width: 176px;
                    width: 176px;
                }
            }

            .calendar {
                .ant-calendar-picker-input {
                    background-color: #ffffff;
                }
            }
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
            <div className='thumbnail-container'>
                <div className='thumbnail' onClick={() => props.history.push(`/shelf/book/${props.book.googleId}`)}></div>
                <Dropdown overlay={TrackMenu} trigger={['click']}>
                    <Button className={(trackBtnLabel === 'Track this' ? 'betterReadsOrange' : 'betterReadsGreen')}>{trackBtnLabel}<DownOutlined /></Button>
                </Dropdown>
            </div>
            <div className='information'>
                <div className='title-and-heart'>
                    <p className='title' onClick={() => props.history.push(`/shelf/book/${props.book.googleId}`)}>{props.book.title}</p>
                    {favorite ? <HeartFilled onClick={() => setFavorite(!favorite)} /> : <HeartOutlined onClick={() => setFavorite(!favorite)} />}
                </div>
                <p className='author' onClick={() => props.history.push(`/shelf/book/${props.book.googleId}`)}>{props.book.authors.split(',')[0]}</p>
                <div className='calendar'>
                    <div className='input'>
                        <p className='prompt'>DATE STARTED</p>
                        <DatePicker placeholder='Started' />
                    </div>
                    <div className='input'>
                        <p className='prompt'>DATE ENDED</p>
                        <DatePicker placeholder='Ended' />
                    </div>
                </div>
            </div>
        </ShelfItemContainer>
    );

};

export default connect(null, { saveBookToLibrary })(ShelfItem);
