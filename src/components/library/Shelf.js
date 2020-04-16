//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import { setCurrentShelf } from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import BookCardList from '../Book/BookCardList';
import MyShelves from '../Shelf/MyShelves';
// Utils
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
//Tracking
import { PageView, Event } from '../../utils/tracking';
//Styling
import ShelfContainer from './styles/ShelfStyle';

const Shelf = (props) => {
  useDocumentTitle('Readrr - Shelf');

  const shelf = props.match.params.shelf;

  useEffect(() => {
    props.setCurrentShelf(shelf);
    Event('Shelf', 'A user looked at a shelf of books', 'SHELF');
    PageView();
  }, []);

  return (
    <>
      <Header/>
      <SearchForm/>
      <Breadcrumbs
        crumbs={[{ label: props.currentShelf.name, path: null }]}
      />
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
  };
};

export default connect(mapStateToProps, { setCurrentShelf })(Shelf);
