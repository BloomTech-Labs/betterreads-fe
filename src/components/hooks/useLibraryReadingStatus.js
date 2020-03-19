import React from 'react';
import { useDispatch } from 'react-redux';
import BookCardList from '../common/BookCardList';

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
            <BookCardList history={history} bookList={books.slice(0, 4)} source={'library'} />
        </div>
    )
}

export default LibraryReadyStatus;