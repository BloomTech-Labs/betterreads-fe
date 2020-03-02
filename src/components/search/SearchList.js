import React from 'react';
import { connect } from 'react-redux';

import SearchItem from './SearchItem';
import SearchPagination from './SearchPagination';

const SearchList = props => {
    return (
        <>
            {
                props.searchResults.items && 
                props.searchResults.items.map(book => (
                    <SearchItem key={book.id} book={book} />
                ))
            }

            {
                props.searchResults.items && 
                    <SearchPagination />
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        fetching: state.search.fetching,
        searchResults: state.search.searchResults
    }
}

export default connect(mapStateToProps)(SearchList);