//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  setCurrentShelf,
  fetchShelfRecommendations,
} from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import BookCardList from '../Book/BookCardList';
import MyShelves from '../Shelf/MyShelves';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import StatusShelfLoading from '../Shelf/StatusShelfLoading';

// Utils
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
//Tracking
import { PageView, Event } from '../../utils/tracking';
//Styling
import ShelfContainer from './styles/ShelfStyle';
import RecsStyle from './styles/RecsStyle';

const Shelf = (props) => {
  useDocumentTitle('Readrr - Shelf');

  const shelf = props.match.params.shelf;
  const books = props.currentShelf.books;

  useEffect(() => {
    props.setCurrentShelf(shelf);
    Event('Shelf', 'A user looked at a shelf of books', 'SHELF');
    PageView();
  }, []);
  // fetchSpecificRecommendations(books);
  if (!props.shelfSuccess) {
    props.fetchShelfRecommendations(books);
  }

  return (
    <>
      <Header />
      <SearchForm />
      <Breadcrumbs crumbs={[{ label: props.currentShelf.name, path: null }]} />
      <RecsStyle>
        {props.recs.length > 0 ? (
          <StatusShelfCarousel
            title={`Recs`}
            shelf={props.currentShelf.name ? props.currentShelf.name : ''}
            display='carousel'
            bookList={props.recs}
            style={{ width: '100%' }}
            breadcrumbs={[
              {
                label: `Recommendations`,
                path: '/shelf/recommendations',
              },
              { label: 'Book details', path: null },
            ]}
          />
        ) : (
          <StatusShelfLoading
            title={`Recommendations based on ${
              props.currentShelf.name ? props.currentShelf.name : ''
            }`}
          />
        )}
      </RecsStyle>
      <ShelfContainer>
        {props.currentShelf &&
          props.currentShelf.name &&
          props.currentShelf.books && (
            <BookCardList
              books={props.currentShelf.books}
              source={'library'}
              label={props.currentShelf.name}
            />
          )}
        <MyShelves source={'shelf'} />
      </ShelfContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentShelf: state.library.currentShelf,
    subject: state.authentication.user.subject,
    recs: state.recommendations.shelfRecs,
    shelfSuccess: state.recommendations.shelfSuccess,
  };
};

export default connect(mapStateToProps, {
  setCurrentShelf,
  fetchShelfRecommendations,
})(Shelf);
