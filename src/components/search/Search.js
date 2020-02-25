import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = () => {
	return (
		<>
			<SearchForm />
			<SearchList />
		</>
	);
};

export default Search;
