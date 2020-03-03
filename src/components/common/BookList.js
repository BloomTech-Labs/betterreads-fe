import React from 'react';
import BookItem from './BookItems';
import Breadcrumbs from './Breadcrumbs';
import ShelfNote from './ShelfNote';

const BookList = (props) => {
    return (
        <>
            <ShelfNote type="search" query={props.query || ''} count={props.count} />
            {
                props.bookList && 
                props.bookList.map(book => (
                    <>
                    <BookItem key={book.id} book={book} />
                    </>
                ))
            }
        </>
    )
}

export default BookList;