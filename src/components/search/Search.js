import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from '../tracking/';

import Header from '../common/Header';
import Breadcrumbs from '../common/Breadcrumbs';

import SearchForm from './SearchForm';
// import SearchBreadcrumb from './SearchBreadCrumbs';
// import SearchList from './_SearchList';

import BookList from '../common/BookList';

import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: #f3f6f5;
	padding: 16px 0;
	margin: 0 0 8px 0;

	.frank {
		font-family: 'Frank Ruhl Libre', serif;
	}
	.openSans {
		font-family: 'Open Sans', sans-serif;
	}
	.fs-16 {
		font-size: 16px;
	}
	.fs-32 {
		font-size: 32px;
	}

	.pb-12 {
		padding-bottom: 12px;
	}
	.pb-16 {
		padding-bottom: 16px;
	}

	.innerWrapper {
		width: 90%;
		margin: 0 auto;
	}
`;

const Search = props => {
	const [source, setSource] = useState(props.source || 'library');

	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);

	return (
		<>
			<Header history={props.history} />
			<Wrapper>
				<div className="innerWrapper">
					<SearchForm />
				</div>
			</Wrapper>
			<Breadcrumbs
				history={props.history}
				crumbs={[{ label: 'Search results', path: '/search' }]}
			/>
			{props.searchResults.books && (
				<BookList
					history={props.history}
					bookList={props.searchResults.books.items}
					count={props.searchResults.books.totalItems}
					query={props.searchResults.query}
				/>
			)}
			{!props.searchResults.books && (
				<Wrapper>
					<div className="innerWrapper">
						<h3>Search for your favorite title or author.</h3>
					</div>
				</Wrapper>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults
	};
};

export default connect(mapStateToProps)(Search);
