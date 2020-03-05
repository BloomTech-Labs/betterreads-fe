import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from '../tracking/';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Header from '../common/Header';
import Breadcrumbs from '../common/Breadcrumbs';
import SearchForm from './SearchForm';
import BookList from '../common/BookList';
import ShelfNote from '../common/ShelfNote';
import styled from 'styled-components';
import ShelfContainer from '../common/ShelfContainer';

const Wrapper = styled.div`
	@media (min-width: 1120px) {
		.somethingClever{
			width: 90%;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.spinnerContainer {
			width: 90%;
			height: 100vh;

			margin-top: 4rem;
		}
	}
`;

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />

const Search = props => {
	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);

	return (
		<Wrapper>
			<Header history={props.history} />	
			<SearchForm />
			<Breadcrumbs history={props.history} crumbs={[{label: "Search", path: null}]} />
			{
				!props.searchResults.books && <ShelfNote note="Search for your favorite title or author." />
			}
			{
				!props.fetching &&
				props.searchResults.books &&
				<ShelfNote note={`${props.searchResults.books.totalItems} results for "${props.searchResults.query}"`} />
			}
			{
				props.fetching && <div className="spinnerContainer"><Spin indicator={antIcon} /></div>
			}
			<div className="somethingClever">
				{
					!props.searchResults.books &&
						<div style={{width: '90%'}}>&nbsp;</div>
				}
				{
					!props.fetching &&
					props.searchResults.books &&
					<BookList history={props.history} bookList={props.searchResults.books.items} count={props.searchResults.books.totalItems} query={props.searchResults.query} />
				}
				<ShelfContainer history={props.history} />
			</div>
		</Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		searchResults: state.search.searchResults
	};
};

export default connect(mapStateToProps)(Search);
