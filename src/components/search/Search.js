import React, { useEffect } from 'react';
import axios from 'axios';
// import  ReactGA from 'react-ga';
import { PageView, Event } from '../tracking/';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = props => {

	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT')
		PageView();
	}, [])
	
	return (
		<>
			<SearchForm />
			<SearchList />
		</>
	);
};

export default Search;
