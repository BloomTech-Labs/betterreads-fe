import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from '../tracking/';
import Header from '../common/Header';
import Breadcrumbs from '../common/Breadcrumbs';
import SearchForm from './SearchForm';
import ShelfNote from '../common/ShelfNote';
import BookCardList from '../common/BookCardList';
import MyShelf from '../common/MyShelf';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import styled from 'styled-components';
import { BackTop } from 'antd';

const SearchContainer = styled.div`
	.ant-back-top-content {
		background-color: rgba(84, 120, 98, 0.75);
  	}

	@media(min-width: 1120px) {
		width: 1120px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
`;

const Search = props => {
	useDocumentTitle('Readrr - Search');

	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);
	
	return (
		<>
			<Header history={props.history} />	
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{label: 'Search', path: null}]} />
			{props.searchResults.books ? <ShelfNote note={`${props.searchResults.books.totalItems} results for "${props.query}"`} /> : <ShelfNote note='Search for your favorite title or author' />}
			<SearchContainer>
				<BackTop />
				{props.searchResults.books ? <BookCardList history={props.history} books={props.searchResults.books.items} source={'search'} /> : <div></div>}
				<MyShelf history={props.history} />
			</SearchContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults,
		query: state.search.query
	};
};

export default connect(mapStateToProps)(Search);
