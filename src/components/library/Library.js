import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	signOut,
	fetchUsersBooks,
	fetchUsersShelves
} from '../../actions/index';
import styled from 'styled-components';

const LibraryContainer = styled.div`
	width: 90%;
	margin: 0 auto;

	.header {
		height: 10vh;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			font-size: 1.125rem;
		}

		img {
			height: 40px;
			border-radius: 50%;
		}

		div {
			height: 40px;
			width: 40px;
			background-color: gray;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				font-size: 1.25rem;
				color: white;
			}
		}
	}
`;

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('id'));
		props.fetchUsersShelves(localStorage.getItem('id'));
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

				{localStorage.getItem('image') === 'null' && (
					<div>
						<i className="fas fa-user"></i>
					</div>
				)}

				{localStorage.getItem('image') !== 'null' && (
					<img
						src={localStorage.getItem('image')}
						alt="profile icon"
						onClick={() => props.signOut(props.history)}
					/>
				)}
			</div>

			<h2>Track my books</h2>
			<p>Add books to track your progress</p>
			<p>To be read ({toBeRead.length})</p>
			<p>In progress ({inProgress.length})</p>
			<p onClick={() => console.log(localStorage.getItem('image'))}>
				Finished ({finished.length})
			</p>

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

export default connect(mapStateToProps, {
	signOut,
	fetchUsersBooks,
	fetchUsersShelves
})(Library);
