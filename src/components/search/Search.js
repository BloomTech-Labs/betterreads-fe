//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import components
import Header from '../Navigation/Header';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import SearchForm from './SearchForm';
import ShelfNote from '../Shelf/ShelfNote';
import BookCardList from '../Book/BookCardList';
import MyShelves from '../Shelf/MyShelves';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import Loader from '../Navigation/Header';
//Styling
import { BackTop } from 'antd';
import SearchContainer from './styles/SearchStyle';
//Tracking
import { PageView, Event } from '../../utils/tracking';

const Search = (props) => {
  useDocumentTitle('Readrr - Search');

  useEffect(() => {
    Event('Search', 'loaded search', 'SEARCH_COMPONENT');
    PageView();
  }, []);

  return (
    <>
      <Header />
      <SearchForm />
      <Breadcrumbs crumbs={[{ label: 'Search', path: null }]} />
      {props.searchResults.books ? (
        <ShelfNote
          note={`${props.searchResults.books.totalItems} results for "${props.query}"`}
        />
      ) : (
        <ShelfNote note='Search for your favorite title or author' />
      )}
      <SearchContainer>
        <BackTop />
        {props.fetching && <Loader size='32px' />}
        {props.searchResults.books && !props.fetching ? (
          <BookCardList
            books={props.searchResults.books.items}
            source={'search'}
          />
        ) : (
          <div></div>
        )}
        <MyShelves />
      </SearchContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fetching: state.search.fetching,
    searchResults: state.search.searchResults,
    query: state.search.query,
  };
};

export default connect(mapStateToProps)(Search);
