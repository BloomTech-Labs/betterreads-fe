import React, { useEffect } from 'react';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import MyShelves from '../common/MyShelves';
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
    return (
        <>
            <Header history={props.history} />
            <SearchForm history={props.history} />
            <Breadcrumbs history={props.history} crumbs={[{ label: 'My Shelves', path: null }]} />
            <ShelvesContainer>
                <div className='shelves'>
                    <h1>My Shelves</h1>
                </div>
                <MyShelves history={props.history} source={'shelves'} />
            </ShelvesContainer>
        </>
    );
};

export default Shelves;