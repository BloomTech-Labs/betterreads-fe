import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentShelf } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfNote from '../common/ShelfNote';
import BookCardList from '../common/BookCardList';
import MyShelves from '../common/MyShelves';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import styled from 'styled-components';

const ShelfContainer = styled.div`
	@media(min-width: 1120px) {
		width: 1120px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
`;

const Shelf = props => {
	useDocumentTitle('Readrr - Shelf');

	const shelf = props.match.params.shelf;
	
	let label;
	if (shelf === 'mybooks') {
		label = 'My books';
	} else if (shelf === 'favorites') {
		label = 'Favorites';
	} else if (shelf === 'toberead') {
		label = 'To be read';
	} else if (shelf === 'inprogress') {
		label = 'In progress';
	} else if (shelf === 'finished') {
		label = 'Finished';
	} else {
		label = shelf;
	};

	useEffect(() => props.setCurrentShelf(shelf), []);

	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{ label, path: null }]} />
			<ShelfContainer>
				<BookCardList history={props.history} books={props.currentShelf} source={'library'} label={label} />
				<MyShelves history={props.history} source={'shelf'} />
			</ShelfContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		currentShelf: state.library.currentShelf
	};
};

export default connect(mapStateToProps, { setCurrentShelf })(Shelf);
