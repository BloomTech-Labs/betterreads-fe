import React, { useEffect } from 'react';
import { PageView, Event } from '../tracking/';
import { Layout, Row, Col, Typography } from 'antd';
import Header from '../common/Header'
import SearchForm from './SearchForm';
import SearchList from './SearchList';

import NewShelfModal from '../common/NewShelfModal';

import styled from 'styled-components';

const Fluff = styled.div`
	padding: 2rem 0;

	.fs-18{font-size: 1.125rem;}
	.pb-1{padding-bottom: 1rem;}
`

const Search = props => {

	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT')
		PageView();
	}, [])
	
	return (
		<>
			<Header />
			<Layout>
				<Layout.Content>
					<Fluff>
						<Row type="flex" justify="center" gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
							<Col span={22}>
								<div className="fs-18 pb-1">Search for a book to track your reading progress and add books to shelves.</div>
							</Col>
						</Row>
						<SearchForm />
					</Fluff>
				</Layout.Content>
			</Layout>
			<NewShelfModal />
			<SearchList />
		</>
	);
};

export default Search;