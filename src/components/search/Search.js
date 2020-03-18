import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from '../tracking/';
import Header from '../common/Header';
import Breadcrumbs from '../common/Breadcrumbs';
import SearchForm from './SearchForm';
import BookList from '../common/BookList';
import ShelfNote from '../common/ShelfNote';
import SearchPagination from '../search/SearchPagination';
import styled from 'styled-components';
import ShelfContainer from '../common/ShelfContainer';

const Wrapper = styled.div`
	@media (min-width: 1120px) {
		.somethingClever{
			width: 1120px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.bookList{
				//width: 72%;
				width: 687px;
			}

			.shelfList{
				width: 26%;
			}
		}

		.spinnerContainer {
			width: 90%;
			height: 100vh;
			margin-top: 4rem;
		}
	}
`;

const Search = props => {
	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);
	
	return (
		<Wrapper>
			<Header history={props.history} />	
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{label: "Search", path: null}]} />
			{!props.searchResults.books && <ShelfNote note="Search for your favorite title or author." />}
			{props.searchResults.books && <ShelfNote note={`${props.searchResults.books.totalItems} results for "${props.query}"`} />}
			
			<div className="somethingClever">
				{!props.searchResults.books && <div className="bookList">&nbsp;</div>}	
				{props.searchResults.books &&
					<div className="bookList">
						<BookList history={props.history} bookList={props.searchResults.books.items} count={props.searchResults.books.totalItems} query={props.query} />
						<SearchPagination />
					</div>
				}
				<div className="shelfList">
					<ShelfContainer history={props.history} />
				</div>
			</div>
		</Wrapper>
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
