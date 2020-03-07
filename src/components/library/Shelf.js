import React from 'react';
import { connect } from 'react-redux';
import { fetchShelfsBooks } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfList from '../library/ShelfList';

const Shelf = props => {
	const shelf = props.match.params.shelf;

	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs
				history={props.history}
				crumbs={[{ label: 'All books', path: null }]}
			/>
			<ShelfList history={props.history} userBooks={props.userBooks} />
		</>
	);
};

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks
	};
};

export default connect(mapStateToProps, { fetchShelfsBooks })(Shelf);
