import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersShelves } from '../../store/actions';
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import MyShelves from '../Shelf/MyShelves';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import styled from 'styled-components';
import Loader from '../Navigation/Loader';
import { PageView, Event } from '../../utils/tracking';

const ShelvesContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 64px;

    .shelves {
        h1 {
            width: 90%;
            margin: 0 auto;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 2rem;
            font-weight: bold;
            color: #3b403d;
        }
    }

    @media(min-width: 1120px) {
        width: 1120px;
        display: flex;
        justify-content: space-between;

        .shelves {
            width: 687px;
            margin: 0;

            h1 {
                width: 687px;
            }
        }
    }
`;

const Shelves = props => {
    useDocumentTitle('Readrr - My Shelves');

    useEffect(() => {
        props.fetchUsersShelves()
        Event('SHELVES', 'A user loaded viewed all of their shelves', 'SHELVES');
        PageView();
    }, [props.userShelves]);

    const userBooks = props.userBooks.filter(item => item);
    const favorites = props.userBooks.filter(item => item.favorite === true);
    const toBeRead = props.userBooks.filter(item => item.readingStatus === 1);
	const inProgress = props.userBooks.filter(item => item.readingStatus === 2);
	const finished = props.userBooks.filter(item => item.readingStatus === 3);

    return (
        <>
            <Header history={props.history} />
            <SearchForm history={props.history} />
            <Breadcrumbs history={props.history} crumbs={[{ label: 'My shelves', path: null }]} />
            <ShelvesContainer>
                <div className='shelves'>
                    <h1>My Shelves</h1>
                    <StatusShelfCarousel title='My books' display='carousel' bookList={userBooks} link='/shelf/mybooks' breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: 'My books', path: '/shelf/mybooks' }, { label: "Book details", path: null }]} history={props.history} />
                    <StatusShelfCarousel title='Favorites' display='carousel' bookList={favorites} link='/shelf/favorites' breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: 'Favorites', path: '/shelf/favorites' }, { label: "Book details", path: null }]} history={props.history} />
                    <StatusShelfCarousel title='To be read' display='carousel' bookList={toBeRead} link='/shelf/toberead' breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: 'To be read', path: '/shelf/toberead' }, { label: "Book details", path: null }]} history={props.history} />
                    <StatusShelfCarousel title='In progress' display='carousel' bookList={inProgress} link='/shelf/inprogress' breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: 'In progress', path: '/shelf/inprogress' }, { label: "Book details", path: null }]} history={props.history} />
                    <StatusShelfCarousel title='Finished' display='carousel' bookList={finished} link='/shelf/finished' breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: 'Finished', path: '/shelf/finished' }, { label: "Book details", path: null }]} history={props.history} />
                    {props.userShelves.map((item, index) => (
                        <StatusShelfCarousel key={index} id={item.shelfId} title={item.shelfName} display='carousel' bookList={item.books} link={`/shelf/${item.shelfId}`} breadcrumbs={[{ label: 'My shelves', path: '/myshelves' }, { label: item.shelfName, path: `/shelf/${item.shelfId}` }, { label: "Book details", path: null }]} history={props.history} />
                    ))}
                </div>
                <MyShelves history={props.history} source={'shelves'} />
            </ShelvesContainer>
        </>
    );
};

const mapStateToProps = state => {
    return {
        userBooks: state.library.userBooks,
        userShelves: state.library.userShelves
    };
};

export default connect(mapStateToProps, { fetchUsersShelves })(Shelves);