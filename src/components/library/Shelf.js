import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchShelfsBooks } from '../../actions';
import styled from 'styled-components';

const ShelfContainer = styled.div``;

const Shelf = props => {
	const id = props.match.params.id;

	useEffect(() => {
		props.fetchShelfsBooks(id);
	}, []);

	return (
		<ShelfContainer>
			<p>shelf component</p>
		</ShelfContainer>
	);
};

export default connect(null, { fetchShelfsBooks })(Shelf);
