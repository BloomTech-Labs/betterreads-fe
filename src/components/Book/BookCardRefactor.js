import React from 'react';
// React Redux
import { connect } from 'react-redux';
// BookCard Util
import {
  BookThumbnail,
  BookInformation,
  BookCalendars,
} from './BookCardComponents';
// Components
import BookCardContainer from './styles/BookCardStyle';
import { Book } from './BookClass';

const BookCardRefactor = (props) => {
  // Book Information
  const book = props.book;
  const thumbnail = book.thumbnail;
  const smallThumbnail = book.smallThumbnail;
  const googleId = book.googleId;
  const source = props.source;
  // Checking if the book is in the users library
  const [libraryBook, setLibraryBook] = React.useState(
    props.userBooks.find((b) => b.googleId === googleId) || null
  );

  const test = new Book(book);
  console.log(test);

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
      <BookThumbnail book={book} source={source} library={libraryBook} />
      <div className='information'>
        <BookInformation book={book} />
        {source === 'library' && (
          <BookCalendars
            library={libraryBook}
            setLibraryBook={setLibraryBook}
            userID={props.user}
          />
        )}
      </div>
    </BookCardContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.library.userBooks,
    user: state.authentication.user.subject,
  };
};

export default connect(mapStateToProps, {})(BookCardRefactor);
