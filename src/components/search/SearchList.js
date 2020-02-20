import React from 'react';
import { connect } from 'react-redux';

import SearchItem from './SearchItem';

const SearchList = props => {
    return (
        <>
            {
                props.searchResults.items && 
                props.searchResults.items.map(book => (
                    <SearchItem book={book} />
                ))
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
        getGoogleResults: state.getGoogleResults,
        searchResults: state.searchResults
    }
}

export default connect(mapStateToProps)(SearchList);