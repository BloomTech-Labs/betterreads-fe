import React from 'react';
import { useDispatch } from 'react-redux';
import BookCard from "../common/BookCard";

function LibraryReadyStatus(title, books, crumbs, link, history) {
    const dispatch = useDispatch();
    return (
        <div className="reading-status">
            <div className='header'>
                <p className='status'>{title} ({books.length})</p>
                <p className='view-all' onClick={() => {
                    dispatch({ type: 'SET_BREADCRUMBS', payload: crumbs});
                    history.push(link);
                }}>View all</p>
            </div>
            <div className='section'>
                {
                    books.slice(0, 4).map((book, i) => {
                        return <BookCard key={i} history={history} book={book} source='library' />
                    })
                }
            </div>
        </div>
    )
}

export default LibraryReadyStatus;