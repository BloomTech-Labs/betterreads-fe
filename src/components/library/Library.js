import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchUsersShelves, getGoogleResults } from '../../actions/index';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import LibraryContainer from './LibraryStyle';
import BookIcon from '../common/BookIcon';
import { PageView, Event } from '../tracking/';

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('id'));
		props.fetchUsersShelves(localStorage.getItem('id'));

		Event('Library', 'User library loaded', 'LIBRARY');
		PageView();
	}, []);

	const toBeRead = props.userBooks.filter(item => item.readingStatus === 1);
	const inProgress = props.userBooks.filter(item => item.readingStatus === 2);
	const finished = props.userBooks.filter(item => item.readingStatus === 3);

	return (
		<LibraryContainer>
			<Header history={props.history} />

			<div className="what-are-you-reading-container">
				<div className="what-are-you-reading">
					<h2>What are you reading?</h2>
					<p>Search for a book that you want to track and add to shelves.</p>
				</div>
				<SearchForm history={props.history} />
			</div>

			<div className='reading-status-and-my-shelves-container'>
				<div className="reading-status-container">
					<div className="reading-status">
						<p>To be read ({toBeRead.length})</p>
						<p>In progress ({inProgress.length})</p>
						<p>Finished ({finished.length})</p>
					</div>
				</div>

				<div className="my-shelves">
					<h2>My Shelves</h2>
					<p className="create-shelves">Create shelves and add books to your custom shelf.</p>
					<button className="create-new-shelf-button">Create new shelf</button>

					<div className="shelves-container">
						<div className="shelf" onClick={() => props.history.push('/shelf/allbooks')}>
							<p className="shelf-name">All books</p>
							<BookIcon height="40px" width="40px" fill="#d9d9d9" />
							{props.userBooks.length === 1 ? (
								<p className="shelf-quantity">1 book</p>
							) : (
								<p className="shelf-quantity">{props.userBooks.length} books</p>
							)}
						</div>

						<div className="shelf">
							<p className="shelf-name">Favorites</p>
							<BookIcon height="40px" width="40px" fill="#D9D9D9" />
							<p className="shelf-quantity">0 books</p>
						</div>

						{/* {props.userShelves.map(item => {
							return (
								<div className="shelf" onClick={() => props.history.push(`/shelf/${item.id}`)}>
									<BookIcon height="64px" width="64px" fill="#E5E5E6" />
									<p className="shelf-name">{item.shelfName}</p>
									<p className="shelf-quantity">0 books</p>
								</div>
							);
						})}
						not doing anything with private value yet, waiting on design */}
					</div>
				</div>
			</div>
		</LibraryContainer>
	);
};

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		userShelves: state.library.userShelves
	};
};

export default connect(mapStateToProps, {
	fetchUsersBooks,
	fetchUsersShelves,
	getGoogleResults
})(Library);
