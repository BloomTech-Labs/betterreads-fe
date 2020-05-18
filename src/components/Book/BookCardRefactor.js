import React from 'react';
// BookCard Util
import { BookThumbnail, BookInformation, BookCalendars } from './BookUtils';
// Components
import BookCardContainer from './styles/BookCardStyle';

const BookCardRefactor = (props) => {
  // Book Information
  const book = props.book;
  const thumbnail = book.thumbnail;
  const smallThumbnail = book.smallThumbnail;
  const googleId = book.googleId;
  const source = props.source;

  return (
    <BookCardContainer
      thumbnail={thumbnail || smallThumbnail}
      source={source}
      conWidth={source === 'recommendation' ? '88px' : '335px'}
      // Unsure if this is being used
      // Will leave commented until sure it is useless
      // data-library={true}
      data-book={googleId}
    >
      <BookThumbnail book={book} source={source} />
      <div className='information'>
        <BookInformation book={book} />
        {source === 'library' && <BookCalendars />}
      </div>
    </BookCardContainer>
  );
};

export default BookCardRefactor;
