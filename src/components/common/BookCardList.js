import React, { useEffect } from 'react';
import BookCard from './BookCard';
import styled from 'styled-components';

// things to be passed, history, book array, source, width

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    @media(min-width: 1120px) {
        max-width: 687px;
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

const BookCardList = props => {
    return (
        <BookCardListContainer>
            {props.bookList.map((item, index) => (
                <BookCard key={index} history={props.history} book={item} source={props.source} />
            ))}
        </BookCardListContainer>
    );
};

export default BookCardList;