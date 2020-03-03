import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShelfsBooks } from '../../actions';
import Header from '../common/Header';
import ExternalSearchForm from '../common/ExternalSearchForm';
import styled from 'styled-components';
import houseicon from '../../img/house-icon.svg';

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
	const shelfID = props.match.params.shelfID;

	useEffect(() => {
		props.fetchShelfsBooks(shelfID);
	}, []);

	return (
		<ShelfContainer>
			<Header history={props.history} />
			<div className="external-search-form-container">
				<div className="external-search-form">
					<ExternalSearchForm history={props.history} />
				</div>
			</div>
			<p className="search-for-a-book">
				Search for a book to track you reading progress and add books to
				shelves.
			</p>
			<form>
				<input />
				<button></button>
			</form>
			<div className="breadcrumbs">
				<img src={houseicon} alt="house icon" />
				<p>Library</p>
				<p>/</p>
				{/* <p>{shelf.shelfName}</p> */}
			</div>
		</ShelfContainer>
	);
};

export default connect(null, { fetchShelfsBooks })(Shelf);
