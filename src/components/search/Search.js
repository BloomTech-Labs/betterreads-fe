import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../Navigation/Header';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import SearchForm from './SearchForm';
import ShelfNote from '../Shelf/ShelfNote';
import BookCardList from '../Book/BookCardList';
import MyShelves from '../Shelf/MyShelves';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import Loader from '../Navigation/Header';
import styled from 'styled-components';
import { BackTop } from 'antd';
import { PageView, Event } from '../../utils/tracking';

const SearchContainer = styled.div`
  .ant-back-top-content {
    background-color: rgba(84, 120, 98, 0.75);
  }

  @media (min-width: 1120px) {
    width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
`;

const Search = (props) => {
  useDocumentTitle('Readrr - Search');

  useEffect(() => {
    Event('Search', 'loaded search', 'SEARCH_COMPONENT');
    PageView();
  }, []);

  return (
    <>
      <Header history={props.history} />
      <SearchForm history={props.history} />
      <Breadcrumbs
        history={props.history}
        crumbs={[{ label: 'Search', path: null }]}
      />
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
            history={props.history}
            books={props.searchResults.books.items}
            source={'search'}
          />
        ) : (
          <div></div>
        )}
        <MyShelves history={props.history} />
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
