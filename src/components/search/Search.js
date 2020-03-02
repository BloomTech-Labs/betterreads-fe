import React, { useEffect } from 'react';
import { PageView, Event } from '../tracking/';
import { Layout, Row, Col, Typography } from 'antd';
import Header from '../common/Header';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

import NewShelfModal from '../common/NewShelfModal';

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
	useEffect(() => {
		Event('Search', 'loaded search', 'SEARCH_COMPONENT');
		PageView();
	}, []);

	return (
		<>
			<Header history={props.history} />
			<Wrapper>
				<div className="innerWrapper">
					<div className="fs-32 pb-16 frank">
						What are you reading?
					</div>
					<div className="fs-16 pb-12 openSans">
						Search for a book to track your reading progress and add
						books to shelves.
					</div>
					<SearchForm />
				</div>
			</Wrapper>
			{/* <NewShelfModal /> */}
			<SearchList />
		</>
	);
};

export default Search;
