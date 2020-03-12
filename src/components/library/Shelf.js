import React from 'react';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfList from '../library/ShelfList';

const Shelf = props => {
	const shelf = props.match.params.shelf;
	
	let label;
	
	if (shelf === 'allbooks') {
		label = 'All books';
	} else if (shelf === 'favorites') {
		label = 'Favorites';
	} else if (shelf === 'toberead') {
		label = 'To be read';
	} else if (shelf === 'inprogress') {
		label = 'In progress';
	} else if (shelf === 'finished') {
		label = 'Finished';
	} else {
		// fetch custom shelf name by using find method on shelf array in redux state, user doesn't want to see number
	};

	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{ label, path: null }]} />
			<ShelfList history={props.history} shelf={shelf} />
		</>
	);
};

export default Shelf;
