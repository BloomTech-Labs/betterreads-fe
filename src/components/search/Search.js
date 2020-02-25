import React, { useEffect } from 'react';
import axios from 'axios';
import  ReactGA from 'react-ga';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = props => {

	useEffect(() => {
		ReactGA.event({ category: 'Search', action: 'loaded search'})
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, [])
	
	return (
		<>
			<SearchForm />
			<SearchList />
		</>
	);
};

export default Search;
