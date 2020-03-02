import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchUsersShelves } from '../../actions/index';
import Header from '../common/Header';
import NewShelfModal from '../common/NewShelfModal';
import styled from 'styled-components';
import BookIcon from '../common/BookIcon';
import { PageView, Event } from '../tracking/';

const LibraryContainer = styled.div`
	.what-are-you-reading {
		background-color: #f3f6f5;

		.what-are-you-reading-container {
			width: 90%;
			margin: 0 auto;

			h2 {
				margin-bottom: 0;
				padding-top: 24px;
				padding-bottom: 8px;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 2rem;
				font-weight: bold;
				color: #3b403d;
				line-height: 40px;
			}

			p {
				margin-bottom: 8px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4e4c4a;
				line-height: 22px;
			}

			.search-form {
				padding-bottom: 12px;
				display: flex;

				input {
					width: 100%;
					padding: 8px 12px;
					border: 1px solid #d9d9d9;
					border-right: none;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
					font-family: 'Open Sans', sans-serif;
					font-size: 1rem;
					color: #4e4c4a;
					line-height: 24px;

					::placeholder {
						color: #868585;
					}
				}

				button {
					padding: 12px;
					background-color: #547862;
					border: none;
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					i {
						font-size: 1.125rem;
						color: #ffffff;
					}
				}
			}
		}
	}

	.reading-status {
		background-color: #f3f6f5;

		.reading-status-container {
			width: 90%;
			margin: 0 auto;
			padding-bottom: 12px;

			p {
				margin-bottom: 0;
				padding: 12px 0;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 1.25rem;
				font-weight: bold;
				color: #4e4c4a;
				border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
			}

			p:last-child {
				border-bottom: none;
			}
		}
	}

	.my-shelves {
		width: 90%;
		margin: 0 auto;

		h2 {
			margin-top: 24px;
			margin-bottom: 4px;
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-size: 1.5rem;
			font-weight: bold;
			color: #547862;
			line-height: 30px;
		}

		.create-shelves {
			margin-bottom: 8px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: #5c5a57;
			line-height: 22px;
		}

		.create-new-shelf-button {
			width: 100%;
			margin-bottom: 16px;
			padding: 8px 12px;
			background-color: #ffffff;
			border: 1px solid #d24719;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			font-weight: 600;
			color: #d24719;
			line-height: 22px;
			cursor: pointer;
		}

		.shelves-container {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.shelf {
				height: 42.75vw;
				width: 47.5%;
				margin-bottom: 4.5vw;
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				cursor: pointer;

				.shelf-name {
					margin-bottom: 0;
					padding: 8px;
					border-bottom: 1px solid #d9d9d9;
					font-family: 'Open Sans', sans-serif;
					font-size: 1.125rem;
					font-weight: 600;
					color: #4e4c4a;
					line-height: 18px;
				}

				svg {
					margin: 0 auto;
				}

				.shelf-quantity {
					margin-bottom: 0;
					padding: 8px;
					font-family: 'Open Sans', sans-serif;
					font-size: 1.125rem;
					font-weight: bold;
					color: #4e4c4a;
					line-height: 22px;
				}
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

	const onSubmit = event => {
		event.preventDefault();
		props.history.push('/search');
	};

	return (
		<LibraryContainer>
			<Header history={props.history} />

			<div className="what-are-you-reading">
				<div className="what-are-you-reading-container">
					<h2>What are you reading?</h2>
					<p>
						Search for a book that you want to track and add to
						shelves.
					</p>

					<form
						className="search-form"
						autoComplete="off"
						spellCheck="false"
						onSubmit={onSubmit}
					>
						<input type="text" placeholder="Search for a book" />
						<button type="submit">
							<i className="fas fa-search"></i>
						</button>
					</form>
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

				<button className="create-new-shelf-button">
					Create new shelf
				</button>

				<div className="shelves-container">
					<div className="shelf">
						<p className="shelf-name">All books</p>
						<BookIcon height="40px" width="40px" fill="#D9D9D9" />
						{props.userLibrary.length === 1 ? (
							<p className="shelf-quantity">1 book</p>
						) : (
							<p className="shelf-quantity">
								{props.userLibrary.length} books
							</p>
						)}
					</div>

					<div className="shelf">
						<p className="shelf-name">Favorites</p>
						<BookIcon height="40px" width="40px" fill="#D9D9D9" />
						<p className="shelf-quantity">0 books</p>
					</div>

					{/* {props.userShelves.map(item => {
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
								<p className="shelf-quantity">0 books</p>
							</div>
						);
					})} */}
					{/* not doing anything with private value yet, waiting on design */}
				</div>
			</div>
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
	fetchUsersBooks,
	fetchUsersShelves
})(Library);
