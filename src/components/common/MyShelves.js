import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, setBreadcrumbs } from '../../actions';
import { Link } from 'react-router-dom';
import CreateNewShelfModal from './CreateNewShelfModal';
import styled from 'styled-components';
import BookIcon from './BookIcon';

const MyShelvesContainer = styled.div`
    max-width: 1120px;
    width: 90%;
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 32px;
    display: ${props => props.source === 'library' ? '' : 'none'};

    h2 {
        margin-bottom: 0;
        font-family: 'Frank Ruhl Libre', sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
        color: #547862;
        cursor: pointer;
        display: flex;
        align-items: center;

        i {
            margin-left: 8px;
            font-size: 1rem;
            transition: 0.25s;
        }

        :hover {
            i {
                margin-left: 16px;
            }
        }
    }

    .create-shelves {
        margin-bottom: 16px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        color: #5c5a57;
    }

    .create-new-shelf-button {
        width: 100%;
        margin-bottom: 16px;
        padding: 10px 0;
        background-color: #ffffff;
        border: 1px solid #d24719;
        border-radius: 4px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: 600;
        color: #d24719;
        cursor: pointer;
        transition: 0.25s;

        :hover {
            background-color: #d24719;
            color: #ffffff;
        }
    }

    .shelves-container {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .shelf {
            height: 42.75vw;
            width: 47.5%;
            margin-bottom: 4.5vw;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;

            .shelf-name {
                margin-bottom: 0;
                padding: 10px;
                font-family: 'Open Sans', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                color: #4e4c4a;
            }

            .thumbnails {
                margin: 0 auto;
                display: flex;

                img {
                    height: 64px;
                    width: 44px;
                    margin-right: 8px;
                    border-radius: 2px;
                }

                img:last-child {
                    margin-right: 0;
                }
            }

            svg {
                margin: 0 auto;
            }

            .shelf-quantity {
                margin-bottom: 0;
                padding: 10px;
                font-family: 'Open Sans', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                color: #4e4c4a;
            }
        }

        .view-all-my-shelves {
            margin-bottom: 0;
            font-family: 'Open Sans', sans-serif;
            color: #5c5a57;
            cursor: pointer;
            transition: 0.25s;

            :hover {
                opacity: 0.5;
            }
        }
    }

    @media(min-width: 1120px) {
        width: 216px;
        margin: 0;
        padding-top: ${props => props.source === 'shelf' ? '0' : '16px'};
        display: block;

        .shelves-container {
            margin-bottom: 0;
            flex-direction: column;
            justify-content: flex-start;
            flex-wrap: nowrap;

            .shelf {
                height: 162px;
                width: 162px;
                margin-bottom: 16px;
            }
        }
    }
`;

const MyShelves = props => {
    useEffect(() => props.fetchUsersBooks(), []);

	const inProgress = props.userBooks.filter(item => item.readingStatus === 2);
    const toBeRead = props.userBooks.filter(item => item.readingStatus === 1);

    return (
        <MyShelvesContainer source={props.source}>
            <div className='my-shelves'>
                <h2 onClick={() => props.history.push('/myshelves')}>My Shelves <i className='fas fa-chevron-right'></i></h2>
                <p className='create-shelves'>Create shelves and add books to your custom shelf.</p>
                <CreateNewShelfModal button={true} history={props.history} />

                <div className='shelves-container'>
                    <div className='shelf' onClick={() => {
                            props.setBreadcrumbs([{ label: 'In progress', path: '/shelf/inprogress' }, { label: 'Book details', path: null }]);
                            props.history.push('/shelf/inprogress');
                    }}>
                        <p className='shelf-name'>In progress</p>
                        {inProgress.length > 0 ? (
                            <div className='thumbnails'>
                                {inProgress.filter(item => item.thumbnail !== null).slice(0, 3).map((item, index) => (
                                    <img key={index} src={item.thumbnail || item.smallThumbnail} alt={item.title} />
                                ))}
                            </div>
                        ) : <BookIcon height='40px' width='40px' fill='#d9d9d9' />}
                        {inProgress.length === 1 ? <p className='shelf-quantity'>1 book</p> : <p className='shelf-quantity'>{inProgress.length} books</p>}
                    </div>

                    <div className='shelf' onClick={() => {
                            props.setBreadcrumbs([{ label: 'To be read', path: '/shelf/toberead' }, { label: 'Book details', path: null }]);
                            props.history.push('/shelf/toberead');
                        }}>
                        <p className='shelf-name'>To be read</p>
                        {toBeRead.length > 0 ? (
                            <div className='thumbnails'>
                                {toBeRead.filter(item => item.thumbnail !== null).slice(0, 3).map((item, index) => (
                                    <img key={index} src={item.thumbnail || item.smallThumbnail} alt={item.title} />
                                ))}
                            </div>
                        ) : <BookIcon height='40px' width='40px' fill='#d9d9d9' />}
                        {toBeRead.length === 1 ? <p className='shelf-quantity'>1 book</p> : <p className='shelf-quantity'>{toBeRead.length} books</p>}
                    </div>

                    <div className='shelf' onClick={() => {
                        props.setBreadcrumbs([{ label: 'My books', path: '/shelf/mybooks' }, { label: 'Book details', path: null }]);
                        props.history.push('/shelf/mybooks');
                    }}>
                        <p className='shelf-name'>My books</p>
                        {props.userBooks.length > 0 ? (
                            <div className='thumbnails'>
                                {props.userBooks.filter(item => item.thumbnail !== null).slice(0, 3).map((item, index) => (
                                    <img key={index} src={item.thumbnail} alt={item.title} />
                                ))}
                            </div>
                        ) : <BookIcon height='40px' width='40px' fill='#d9d9d9' />}
                        {props.userBooks.length === 1 ? <p className='shelf-quantity'>1 book</p> : <p className='shelf-quantity'>{props.userBooks.length} books</p>}
                    </div>
                </div>
            </div>
        </MyShelvesContainer>
    );
};

const mapStateToProps = state => {
    return {
        userBooks: state.library.userBooks
    };
};

export default connect(mapStateToProps, { fetchUsersBooks, setBreadcrumbs })(MyShelves);