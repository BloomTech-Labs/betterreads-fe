import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import SearchPagination from '../search/SearchPagination';
import styled from 'styled-components';

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    h2 {
        margin-bottom: 16px;
        font-family: 'Frank Ruhl Libre', sans-serif;
        font-size: 2rem;
        font-weight: bold;
        color: #3b403d;
        display: flex;
        align-items: center;

        i {
            // display: none;
            margin-left: 8px;
            font-size: 1rem;
            color: #547862;
            cursor: pointer;
        }

        // :hover {
        //     i {
        //         display: initial;
        //     }
        // }
    }

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
    const [shelfName, setShelfName] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => setShelfName(props.label));

    return (
        <>
            <BookCardListContainer>
                {props.label && <h2>{shelfName}<i className='fas fa-pen'></i><i className='far fa-trash-alt'></i></h2>}
                <div className='book-card-list'>
                    {props.books.map((item, index) => <BookCard key={index} history={props.history} book={item} source={props.source} />)}
                </div>
                {props.source === 'search' && <SearchPagination />}
            </BookCardListContainer>
        </>
    );
};

export default BookCardList;