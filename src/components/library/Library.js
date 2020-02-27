import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signOut, fetchUsersBooks } from '../../actions/index';
import styled from 'styled-components';

const LibraryContainer = styled.div`
	width: 90%;
	margin: 0 auto;
`;

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('user_id'));
	}, []);

	const toBeRead = props.userLibrary.filter(item => item.readingStatus === 1);
	const inProgress = props.userLibrary.filter(
		item => item.readingStatus === 2
	);
	const finished = props.userLibrary.filter(item => item.readingStatus === 3);

	return (
		<LibraryContainer>
			<div className="header">
				<h1>BetterReads</h1>
				<img src="" alt="profile icon" />
			</div>

			<button onClick={() => props.signOut(props.history)}>
				Sign Out
			</button>

			<h2>Track my books</h2>
			<p>Add books to track your progress</p>
			<p>To be read ({toBeRead.length})</p>
			<p>In progress ({inProgress.length})</p>
			<p>Finished ({finished.length})</p>

			<h2>My Shelves</h2>
			<p>Create shelves and add books to your custom shelves.</p>

			<p>All books</p>
			<p>{props.userLibrary.length} books</p>

			<button onClick={() => console.log(props.userLibrary)}>
				Create a new shelf +
			</button>
		</LibraryContainer>
	);
};

const mapStateToProps = state => {
	return {
		userLibrary: state.library.userLibrary
	};
};

export default connect(mapStateToProps, { signOut, fetchUsersBooks })(Library);
