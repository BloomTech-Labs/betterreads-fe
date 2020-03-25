import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import SearchPagination from '../search/SearchPagination';
import styled from 'styled-components';

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    .shelf-name {
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            margin-bottom: 0;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 2rem;
            font-weight: bold;
            color: #3b403d;
            display: flex;
            align-items: center;
            cursor: pointer;
    
            i {
                margin-left: 8px;
            }
        }

        i {
            font-size: 1rem;
            color: #d9d9d9;
            cursor: pointer;
        }
    
        form {
            input {
                width: 687px;
                font-family: 'Frank Ruhl Libre', sans-serif;
                font-size: 2rem;
                font-weight: bold;
                color: #3b403d;
                border: none;
                outline: none;
            }
        }
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

    useEffect(() => setShelfName(props.label), []);

    const onChange = event => {
        setShelfName(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        setEditing(false);
    };

    return (
        <>
            <BookCardListContainer>
                {props.label && <div className='shelf-name'>
                    {editing ? (
                        <form onSubmit={onSubmit} onBlur={onSubmit} autoComplete='off' spellCheck='false'>
                            <input type='text' value={shelfName} onChange={onChange} autoFocus/>
                        </form>
                    ) : (
                        <>
                            <h2 onClick={() => setEditing(true)} title='Edit'>{shelfName}<i className='fas fa-pen' onClick={() => setEditing(true)}></i></h2>
                            <i className='fas fa-trash' title='Delete'></i>
                        </>
                    )}
                </div>}

                <div className='book-card-list'>
                    {props.books.map((item, index) => <BookCard key={index} history={props.history} book={item} source={props.source} />)}
                </div>

                {props.source === 'search' && <SearchPagination />}
            </BookCardListContainer>
        </>
    );
};

export default BookCardList;