import React from 'react';

import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = props => {   
    return (
        <>
            <h1>Search</h1>
            <SearchForm />
            <SearchList />
        </>
    )
}

export default Search;