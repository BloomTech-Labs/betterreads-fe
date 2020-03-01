import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	signOut,
	fetchUsersBooks,
	fetchUsersShelves
} from '../../actions/index';
import BookIcon from '../common/BookIcon';
import NewShelfModal from '../common/NewShelfModal';
import styled from 'styled-components';
import { PageView, Event } from '../tracking/';

import SearchForm from '../search/SearchForm';

const LibraryContainer = styled.div`
	.header {
		height: 10vh;
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			font-family: 'Open Sans', sans-serif;
			font-size: 1.375rem;
			color: #5c7c69;
		}

		img {
			height: 40px;
			width: 40px;
			border-radius: 50%;
		}

		.default-profile-icon {
			height: 40px;
			width: 40px;
			background-color: #859996;
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

	.what-are-you-reading {
		padding: 24px 0;
		background-color: #e5e5e5;

		.what-are-you-reading-container {
			width: 90%;
			margin: 0 auto;

			h2 {
				margin-bottom: 8px;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 1.875rem;
				font-weight: 900;
				color: #3b403d;
			}

			p {
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #5c5a57;
			}
		}
	}

	.reading-status {
		padding: 8px 0;
		background-color: #e5e5e5;

		.reading-status-container {
			width: 90%;
			margin: 0 auto;

			p {
				padding: 16px 0;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 1rem;
				font-weight: bold;
				color: #5c5a57;
				border-bottom: 1px solid rgba(217, 217, 217, 0.5);
			}

			p:last-child {
				border-bottom: none;
			}
		}
	}

	.my-shelves {
		width: 90%;
		margin: 0 auto;
		margin-top: 24px;
		margin-bottom: 24px;

		h2 {
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-size: 1.5rem;
			font-weight: bold;
			color: #547862;
		}

		.create-shelves {
			margin-bottom: 24px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: #5c5a57;
		}

		.shelves-container {
			margin: 24px 0;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.shelf {
				height: 38.25vw;
				width: 47.5%;
				margin-bottom: 5%;
				border: 1px solid rgba(228, 228, 228, 0.6);
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				cursor: pointer;

				.shelf-name {
					font-family: 'Open Sans', sans-serif;
					font-size: 1.125rem;
					font-weight: 600;
					color: #5c5a57;
				}

				.shelf-quantity {
					font-family: 'Open Sans', sans-serif;
					font-size: 1rem;
					color: #868585;
				}
			}
		}

		button {
			width: 100%;
			padding: 12px;
			background-color: #d24719;
			border: none;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			font-weight: 600;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;

			svg {
				margin-right: 4px;
			}
		}
	}
`;

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('id'));
		props.fetchUsersShelves(localStorage.getItem('id'));

		Event('Library', 'User library loaded', 'LIBRARY');
		PageView();
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

				{(!localStorage.getItem('image') ||
					localStorage.getItem('image') === 'null') && (
					<div
						className="default-profile-icon"
						onClick={() => props.signOut(props.history)}
					>
						<i className="fas fa-user"></i>
					</div>
				)}

				{localStorage.getItem('image') &&
					localStorage.getItem('image') !== 'null' && (
						<img
							src={localStorage.getItem('image')}
							alt="profile icon"
							onClick={() => props.signOut(props.history)}
						/>
					)}
			</div>

			<div className="what-are-you-reading">
				<div className="what-are-you-reading-container">
					<h2>What are you reading?</h2>
					<p>
						Search for a book to track you reading progress and add
						books to shelves.
					</p>
					<SearchForm />
				</div>
			</div>

			<div className="reading-status">
				<div className="reading-status-container">
					<p>To be read ({toBeRead.length})</p>
					<p>In progress ({inProgress.length})</p>
					<p>Finished ({finished.length})</p>
				</div>
			</div>

			<div className="my-shelves">
				<h2>My Shelves</h2>
				<p className="create-shelves">
					Create shelves and add books to your custom shelves.
				</p>

				<div className="shelves-container">
					<div className="shelf">
						<BookIcon height="64px" width="64px" fill="#E5E5E6" />
						<p className="shelf-name">All books</p>
						{props.userLibrary.length === 1 ? (
							<p className="shelf-quantity">1 book</p>
						) : (
							<p className="shelf-quantity">
								{props.userLibrary.length} books
							</p>
						)}
					</div>

					{props.userShelves.map(item => {
						return (
							<div
								className="shelf"
								onClick={() =>
									props.history.push(`/shelf/${item.id}`)
								}
							>
								<BookIcon
									height="64px"
									width="64px"
									fill="#E5E5E6"
								/>
								<p className="shelf-name">{item.shelfName}</p>
								<p className="shelf-quantity">1 book</p>
							</div>
						);
					})}
					{/* not doing anything with private value yet, waiting on design */}
				</div>

				{/* <button
					onClick={() =>
						Event(
							'Library',
							'User clicked to create a new shelf',
							'LIBRARY'
						)
					}
				>
					<BookIcon height="16px" width="16px" fill="#E5E5E6" />
					Create a new shelf +
				</button> */}
			</div>
			<NewShelfModal />
		</LibraryContainer>
	);
};

const mapStateToProps = state => {
	return {
		userLibrary: state.library.userLibrary,
		userShelves: state.library.userShelves
	};
};

export default connect(mapStateToProps, {
	signOut,
	fetchUsersBooks,
	fetchUsersShelves
})(Library);
