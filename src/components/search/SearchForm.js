//Import React
import React from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  getGoogleResults,
  clearSearchResults,
  setQuery,
  setBreadcrumbs,
} from '../../store/actions';
//Styling
import { Input } from 'antd';
import Wrapper from './styles/SearchFormStyle';
//Utils
import { Event } from '../../utils/tracking';
import history from '../../utils/history';

const SearchForm = (props) => {
  const handleChange = (e) => {
    props.setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    Event('SEARCH', 'A search was made', 'SEARCH_FORM');
    props.getGoogleResults(props.query);
    props.setBreadcrumbs([
      { label: 'Search results', path: '/search' },
      { label: 'Book details', path: null },
    ]);
    if (history.location.pathname !== '/search') history.push('/search');
  };

  return (
    <Wrapper>
      <div className='innerWrapper'>
        <Input.Search
          name='q'
          aria-label='search-box'
          placeholder='Search for a book'
          size='large'
          onSearch={handleSearch}
          onPressEnter={handleSearch}
          onChange={handleChange}
          value={props.query}
          enterButton
          autoComplete='off'
          spellCheck='false'
        />
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    fetching: state.search.fetching,
    query: state.search.query,
  };
};

export default connect(mapStateToProps, {
  getGoogleResults,
  clearSearchResults,
  setQuery,
  setBreadcrumbs,
})(SearchForm);
