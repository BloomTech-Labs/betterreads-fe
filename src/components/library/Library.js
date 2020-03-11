import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchUsersShelves, getGoogleResults, setBreadcrumbs } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import ShelfItem from './ShelfItem';
import LibraryContainer from './LibraryStyle';
import BookIcon from '../common/BookIcon';
import { PageView, Event } from '../tracking';

const Library = props => {
	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('id'));
		
		// release canvas 2
		// props.fetchUsersShelves(localStorage.getItem('id'));

		// google analytics
		Event('Library', 'User library loaded', 'LIBRARY');
		PageView();
	}, []);

	const fullName = localStorage.getItem('full_name').split(' ')[0];
	const toBeRead = props.userBooks.filter(item => item.readingStatus === 1);
	const inProgress = props.userBooks.filter(item => item.readingStatus === 2);
	const finished = props.userBooks.filter(item => item.readingStatus === 3);
	const favorites = props.userBooks.filter(item => item.favorite === true);

	return (
		<LibraryContainer>
			<Header history={props.history} />

			<div className="what-are-you-reading-container">
				<div className="what-are-you-reading">
					{props.userBooks.length > 10 ? <h2>Welcome back, {fullName[0]}!</h2> : <h2>What are you reading?</h2>}
					<p>Search for a book that you want to track and add to shelves.</p>
				</div>
				<SearchForm history={props.history} />
			</div>

			<div className='reading-status-and-my-shelves-container'>

				<div className="reading-status-container">
					<div className="reading-status">
						<div className='header'>
							<p className='status'>To be read ({toBeRead.length})</p>
							<p className='view-all' onClick={() => {
								props.setBreadcrumbs([{ label: 'To be read', path: '/shelf/toberead' }, { label: 'Book details', path: null }]);
								props.history.push('/shelf/toberead');
							}}>View all</p>
						</div>
						<div className='section'>
							{toBeRead[0] && <ShelfItem history={props.history} book={toBeRead[0]} label='To be read' path='/shelf/toberead' />}
							{toBeRead[1] && <ShelfItem history={props.history} book={toBeRead[1]} label='To be read' path='/shelf/toberead' />}
							{toBeRead[2] && <ShelfItem history={props.history} book={toBeRead[2]} label='To be read' path='/shelf/toberead' />}
							{toBeRead[3] && <ShelfItem history={props.history} book={toBeRead[3]} label='To be read' path='/shelf/toberead' />}
						</div>
					</div>

					<div className="reading-status">
						<div className='header'>
							<p className='status'>In progress ({inProgress.length})</p>
							<p className='view-all' onClick={() => {
								props.setBreadcrumbs([{ label: 'In progress', path: '/shelf/inprogress' }, { label: 'Book details', path: null }]);
								props.history.push('/shelf/inprogress');
							}}>View all</p>
						</div>
						<div className='section'>
							{inProgress[0] && <ShelfItem history={props.history} book={inProgress[0]} label='In progress' path='/shelf/inprogress' />}
							{inProgress[1] && <ShelfItem history={props.history} book={inProgress[1]} label='In progress' path='/shelf/inprogress' />}
							{inProgress[2] && <ShelfItem history={props.history} book={inProgress[2]} label='In progress' path='/shelf/inprogress' />}
							{inProgress[3] && <ShelfItem history={props.history} book={inProgress[3]} label='In progress' path='/shelf/inprogress' />}
						</div>
					</div>

					<div className="reading-status">
						<div className='header'>
							<p className='status'>Finished ({finished.length})</p>
							<p className='view-all' onClick={() => {
								props.setBreadcrumbs([{ label: 'Finished', path: '/shelf/finished' }, { label: 'Book details', path: null }]);
								props.history.push('/shelf/finished');
							}}>View all</p>
						</div>
						<div className='section'>
							{finished[0] && <ShelfItem history={props.history} book={finished[0]} label='Finished' path='/shelf/finished' />}
							{finished[1] && <ShelfItem history={props.history} book={finished[1]} label='Finished' path='/shelf/finished' />}
							{finished[2] && <ShelfItem history={props.history} book={finished[2]} label='Finished' path='/shelf/finished' />}
							{finished[3] && <ShelfItem history={props.history} book={finished[3]} label='Finished' path='/shelf/finished' />}
						</div>
					</div>
				</div>

				<div className="my-shelves">
					<h2>My Shelves</h2>
					<p className="create-shelves">Create shelves and add books to your custom shelf.</p>
					{/* <button className="create-new-shelf-button">Create new shelf</button> */}

					<div className="shelves-container">
						<div className="shelf" onClick={() => props.history.push('/shelf/allbooks')}>
							<p className="shelf-name">All books</p>
							<BookIcon height="40px" width="40px" fill="#d9d9d9" />
							{props.userBooks.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{props.userBooks.length} books</p>}
						</div>

						<div className="shelf" onClick={() => props.history.push('/shelf/favorites')}>
							<p className="shelf-name">Favorites</p>
							<BookIcon height="40px" width="40px" fill="#D9D9D9" />
							{favorites.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{favorites.length} books</p>}
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
						nothing is being done with private value yet, waiting on design */}
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

export default connect(mapStateToProps, { fetchUsersBooks, fetchUsersShelves, getGoogleResults, setBreadcrumbs })(Library);
