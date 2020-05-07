//Import React
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Axios
import { axiosWithAuth } from '../../utils/axiosWithAuth';
//Import Actions
import {
  fetchUsersBooks,
  fetchCurrentBook,
  setBreadcrumbs,
  getBooksOnShelves,
  setQuery,
  getGoogleResults,
  fetchBookRecommendations,
  addBookRecommendations,
} from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import BookCard from '../Book/BookCard';
import MyShelves from '../Shelf/MyShelves';
import AddToExistingShelf from '../Shelf/AddToExistingShelf';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import ShelfBookContainer from './styles/ShelfBookStyle';
import Loader from '../Navigation/Loader';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import StatusShelfLoading from '../Shelf/StatusShelfLoading';
//Utils
import { PageView, Event } from '../../utils/tracking';

const ShelfBook = (props) => {
  useDocumentTitle('Readrr - Book details');

  const [readMore, setReadMore] = useState(false);
  const [recs, setRecs] = useState([]);

  const googleID = props.match.params.id;
  const DS_API = process.env.REACT_APP_API_URL || 'https://api.readrr.app';
  const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/search';

  const fetchRecommendations = (googleID) => {
    return new Promise((resolve, reject) => {
      axiosWithAuth()
        .post(readrrDSURL, { type: 'googleId', query: googleID })
        .then((book) => {
          const newBook = book.data.map((book) => {
            return {
              authors: book.authors && book.authors.toString(),
              averageRating: book.averageRating || null,
              categories:
                (book.categories && book.categories.toString()) || null,
              description: book.description || null,
              googleId: book.googleId,
              isEbook: book.isEbook || null,
              isbn10: book.isbn10 || null,
              isbn13: book.isbn13 || null,
              language: book.language || null,
              pageCount: book.pageCount || null,
              publishedDate: book.publishedDate || null,
              publisher: book.publisher || null,
              smallThumbnail: book.smallThumbnail
                ? book.smallThumbnail.replace('http://', 'https://')
                : null,
              textSnippet: book.textSnippet || null,
              title: book.title || null,
              thumbnail: book.thumbnail
                ? book.thumbnail.replace('http://', 'https://')
                : null,
              webReaderLink: book.webReaderLink || null,
            };
          });
          newBook[0].favorite = false;
          axiosWithAuth()
            .post(`${DS_API}/api/${props.subject}/recommendations`, {
              books: newBook,
            })
            .then((response) => {
              resolve(response.data.recommendations);
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  };

  useEffect(() => {
    fetchRecommendations(googleID)
      .then((res) => {
        setRecs(res.recommendations);
      })
      .catch((err) => console.log(err));
    props.fetchCurrentBook(googleID);
    props.getBooksOnShelves();
    Event('BOOK', 'A user viewed a book', 'SHELF_BOOK');
    PageView();
  }, []);

  props.addBookRecommendations(recs);

  const categoryDisplay = () => {
    let categorySet = new Set();

    props.currentBook.categories
      .split(',')
      .map((cat) => cat.split('/').map((c) => categorySet.add(c.trim())));

    return Array.from(categorySet)
      .sort()
      .map((cat, index) => (
        // onClick={() => {props.setQuery(cat); props.getGoogleResults(cat, 'subject'); history.push('/search');}
        <p className='genre' key={index}>
          {cat}
        </p>
      ));
  };

  return (
    <>
      <Header />
      <SearchForm />
      <Breadcrumbs crumbs={props.breadcrumbs} />

      <ShelfBookContainer readMore={readMore}>
        {props.fetchingCurrentBook && <Loader />}
        {!props.fetchingCurrentBook && (
          <div className='book-details'>
            {props.currentBook && props.currentBook.googleId === googleID && (
              <BookCard book={props.currentBook} source='search' />
            )}

            {props.currentBook.description && (
              <div className='description' data-testid='description'>
                <p className='heading'>Description</p>
                <div
                  className='content'
                  data-testid='description'
                  dangerouslySetInnerHTML={{
                    __html: props.currentBook.description,
                  }}
                ></div>
                <p
                  className='read-more'
                  data-testid='read-more'
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? 'Read less...' : 'Read more...'}
                </p>
              </div>
            )}

            <div className='description' style={{ paddingBottom: '1rem' }}>
              <p className='heading' style={{ fontSize: '1rem' }}>
                Information
              </p>
              <div className='info-container'>
                {props.currentBook.title && (
                  <div className='info-item'>
                    <div className='info-title'>Title:</div>
                    <div className='info-value'>
                      {props.currentBook.title && props.currentBook.title}
                    </div>
                  </div>
                )}
                {props.currentBook.authors && (
                  <div className='info-item'>
                    <div className='info-title'>Author:</div>
                    <div className='info-value'>
                      {props.currentBook.authors &&
                        props.currentBook.authors
                          .split(',')
                          .map((author, index) => (
                            <div key={index}>{author}</div>
                          ))}
                    </div>
                  </div>
                )}
                {props.currentBook.publisher && (
                  <div className='info-item' data-testid='info-item'>
                    <div className='info-title' data-testid='info-title'>
                      Publisher:
                    </div>
                    <div className='info-value' data-testid='info-value'>
                      {props.currentBook.publisher &&
                        props.currentBook.publisher}
                      ,{' '}
                      {props.currentBook.publishedDate &&
                        props.currentBook.publishedDate.split('-')[0]}
                    </div>
                  </div>
                )}
                {props.currentBook.isbn10 !== null &&
                  props.currentBook.isbn13 !== null && (
                    <div className='info-item'>
                      <div className='info-title'>ISBN:</div>
                      <div className='info-value'>
                        {props.currentBook.isbn13 !== null
                          ? props.currentBook.isbn13
                          : props.currentBook.isbn10}
                      </div>
                    </div>
                  )}
                {props.currentBook.pageCount && (
                  <div className='info-item'>
                    <div className='info-title'>Length:</div>
                    <div className='info-value'>
                      {props.currentBook.pageCount &&
                        props.currentBook.pageCount}{' '}
                      pages
                    </div>
                  </div>
                )}
              </div>
            </div>
            {props.userBooks.find(
              (b) => b.googleId === props.match.params.id
            ) && <AddToExistingShelf bookId={props.match.params.id} />}

            {props.recs.length > 0 ? (
              <StatusShelfCarousel
                title='Recommendations'
                display='carousel'
                bookList={props.recs}
                breadcrumbs={[
                  {
                    label: 'Recommendations',
                    path: '/shelf/recommendations',
                  },
                  { label: 'Book details', path: null },
                ]}
              />
            ) : (
              <StatusShelfLoading />
            )}

            {props.currentBook.categories && (
              <div className='genre-big-container'>
                <div className='genre-small-container'>
                  <p className='heading'>Genres</p>
                  <div className='genres'>
                    {props.currentBook.categories && categoryDisplay()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <MyShelves />
      </ShelfBookContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.library.userBooks,
    fetchingCurrentBook: state.book.fetchingCurrentBook,
    currentBook: state.book.currentBook,
    breadcrumbs: state.book.breadcrumbs,
    subject: state.authentication.user.subject,
    recs: state.recommendations.bookRecs,
    bookSuccess: state.recommendations.bookSuccess,
  };
};

export default connect(mapStateToProps, {
  fetchUsersBooks,
  fetchCurrentBook,
  setBreadcrumbs,
  getBooksOnShelves,
  setQuery,
  getGoogleResults,
  fetchBookRecommendations,
  addBookRecommendations,
})(ShelfBook);
