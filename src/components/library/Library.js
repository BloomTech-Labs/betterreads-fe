import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signOut, fetchUsersBooks } from '../../actions/index';
import styled from 'styled-components';

const LibraryContainer = styled.div``;

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('user_id'));
	}, []);

	return (
		<>
			<button onClick={() => props.signOut(props.history)}>
				Sign Out
			</button>

			<h2>Track my books</h2>
			<p>Add books to track your progress</p>
			<p>To be read (0)</p>
			<p>In progress (0)</p>
			<p>Finished (0)</p>

			<h2>My Shelves</h2>
			<p>Create shelves and add books to your custom shelves.</p>

			<p>All books</p>
			<p>{props.userLibrary.length} books</p>

			<button onClick={() => console.log(props.userLibrary)}>
				Create a new shelf +
			</button>
		</>
	);
};

const mapStateToProps = state => {
	return {
		userLibrary: state.library.userLibrary
	};
};

export default connect(mapStateToProps, { signOut, fetchUsersBooks })(Library);
