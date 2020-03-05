import React from 'react';
import { connect } from 'react-redux';
import { fetchShelfsBooks } from '../../actions';
import Header from '../common/Header';
import ExternalSearchForm from '../common/ExternalSearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfList from '../library/ShelfList';
import styled from 'styled-components';

const ShelfContainer = styled.div`
	.external-search-form-container {
		background-color: #f3f6f5;

		.external-search-form {
			width: 90%;
			margin: 0 auto;

			form {
				padding-top: 12px;
				padding-bottom: 12px;
			}
		}
	}
`;

const Shelf = props => {
	const shelf = props.match.params.shelf;

	return (
		<ShelfContainer>
			<Header history={props.history} />
			<div className="external-search-form-container">
				<div className="external-search-form">
					<ExternalSearchForm history={props.history} />
				</div>
			</div>
			<Breadcrumbs
				history={props.history}
				crumbs={[{ label: 'All books', path: null }]}
			/>
			<ShelfList
				history={props.history}
				bookList={props.userLibrary}
				count={props.userLibrary.length}
			/>
		</ShelfContainer>
	);
};

const mapStateToProps = state => {
	return {
		userLibrary: state.library.userLibrary
	};
};

export default connect(mapStateToProps, { fetchShelfsBooks })(Shelf);
