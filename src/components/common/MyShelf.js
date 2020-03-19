import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, setBreadcrumbs } from  '../../actions';
import styled from 'styled-components';
import BookIcon from './BookIcon';

const MyShelfContainer = styled.div`
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
                border-bottom: 1px solid #d9d9d9;
                font-family: 'Open Sans', sans-serif;
                font-size: 1rem;
                font-weight: 600;
                color: #4e4c4a;
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
    }

    @media(min-width: 1120px) {
        width: 216px;
        margin: 0;
        display: block;

        .create-new-shelf-button {
            width: 162px;
        }

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

const MyShelf = props => {
    useEffect(() => {
        props.fetchUsersBooks();
    }, []);

    const favorites = props.userBooks.filter(item => item.favorite === true);

    return (
        <MyShelfContainer source={props.source}>
            <div className="my-shelves">
                <h2 onClick={() => props.history.push('/')}>My Shelves</h2>
                <p className="create-shelves">Create shelves and add books to your custom shelf.</p>
                <button className="create-new-shelf-button">Create new shelf</button>

                <div className="shelves-container">
                    <div className="shelf" onClick={() => {
                            props.setBreadcrumbs([{ label: 'All books', path: '/shelf/allbooks' }, { label: 'Book details', path: null }]);
                            props.history.push('/shelf/allbooks');
                    }}>
                        <p className="shelf-name">All books</p>
                        <BookIcon height="40px" width="40px" fill="#d9d9d9" />
                        {props.userBooks.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{props.userBooks.length} books</p>}
                    </div>

                    <div className="shelf" onClick={() => {
                            props.setBreadcrumbs([{ label: 'Favorites', path: '/shelf/favorites' }, { label: 'Book details', path: null }]);
                            props.history.push('/shelf/favorites');
                        }}>
                        <p className="shelf-name">Favorites</p>
                        <BookIcon height="40px" width="40px" fill="#d9d9d9" />
                        {favorites.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{favorites.length} books</p>}
                    </div>

                    {/* {props.userShelves.map(item => {
                        return (
                            <div className="shelf" onClick={() => props.history.push(`/shelf/${item.id}`)}>
                                <BookIcon height="64px" width="64px" fill="#E5E5E6" />
                                <p className="shelf-name">{item.shelfName}</p>
                                <p className="shelf-quantity">0 books</p>
                            </div>
                        );
                    })}*/}
                </div>
            </div>
        </MyShelfContainer>
    );
};

const mapStateToProps = state => {
    return {
        userBooks: state.library.userBooks
    };
};

export default connect(mapStateToProps, { fetchUsersBooks, setBreadcrumbs })(MyShelf);