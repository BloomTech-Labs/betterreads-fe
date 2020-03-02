import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShelfsBooks } from '../../actions';
import Header from '../common/Header';
import styled from 'styled-components';
import houseicon from '../../img/house-icon.svg';

const ShelfContainer = styled.div``;

const Shelf = props => {
	const shelfID = props.match.params.shelfID;

	useEffect(() => {
		props.fetchShelfsBooks(shelfID);
	}, []);

	return (
		<>
			{/* <Header /> */}
			<ShelfContainer>
				<p className="search-for-a-book">
					Search for a book to track you reading progress and add
					books to shelves.
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
		</>
	);
};

export default connect(null, { fetchShelfsBooks })(Shelf);
