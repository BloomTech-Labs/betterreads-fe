import React, { useEffect } from 'react';
import BookCard from './BookCard';
import SearchPagination from '../search/SearchPagination';
import styled from 'styled-components';

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    @media(min-width: 1120px) {
        width: 687px;
        margin: 0;

        .book-card-list {
            display: flex;
            justify-content: space-between;
            align-content: flex-start;
            flex-wrap: wrap;
        }
    }
`;

const BookCardList = props => {
    return (
        <>
            <BookCardListContainer>
                <div className='book-card-list'>
                    {props.books.map((item, index) => <BookCard key={index} history={props.history} book={item} source={props.source} />)}
                </div>
                {props.source === 'search' && <SearchPagination />}
            </BookCardListContainer>
        </>
    );
};

export default BookCardList;