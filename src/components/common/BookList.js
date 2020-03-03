import React from 'react';
import BookItem from './BookItems';

const BookList = (props) => {
    return (
        <>
            {
                props.bookList && 
                props.bookList.map(book => (
                    <BookItem key={book.id} book={book} />
                ))
            }
        </>
    )
}

export default BookList;