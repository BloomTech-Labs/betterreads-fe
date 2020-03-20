import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersShelves } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import MyShelves from '../common/MyShelves';
import StatusShelfCarousel from '../common/StatusShelfCarousel';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import styled from 'styled-components';

const ShelvesContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    .shelves {
        h1 {
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 2rem;
            font-weight: bold;
        }
    }

    @media(min-width: 1120px) {
        width: 1120px;
        display: flex;
        justify-content: space-between;
    }
`;

const Shelves = props => {
    useDocumentTitle('Readrr - My Shelves');

    useEffect(() => props.fetchUsersShelves(), []);

    // fetchUsersBooks
    // fetchshelfsbooks

    return (
        <>
            <Header history={props.history} />
            <SearchForm history={props.history} />
            <Breadcrumbs history={props.history} crumbs={[{ label: 'My Shelves', path: null }]} />
            <ShelvesContainer>
                <div className='shelves'>
                    <h1>My Shelves</h1>
                    <StatusShelfCarousel title='All books' display='carousel' bookList={props.userBooks} link='/shelf/allbooks' breadcrumbs={[{ label: 'All books', path: '/shelf/allbooks' }, { label: "Book details", path: null }]} history={props.history} />
                    {/* {props.userShelves.map(item => {
                    })} */}
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