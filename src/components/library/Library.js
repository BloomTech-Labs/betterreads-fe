import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchUsersShelves, getGoogleResults, setBreadcrumbs } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import BookCard from '../common/BookCard';
import MyShelf from '../common/MyShelf';
import LibraryContainer from './styles/LibraryStyle';
import BookIcon from '../common/BookIcon';
import { PageView, Event } from '../tracking';
import useDocumentTitle from '../hooks/useDocumentTitle'
import StatusShelfCarousel from '../common/StatusShelfCarousel';

const Library = props => {
	useDocumentTitle(`Readrr - Library`);
	
	useEffect(() => {
		props.fetchUsersBooks();
		props.setBreadcrumbs([{ label: 'Book details', path: null }]);
		// props.fetchUsersShelves(localStorage.getItem('id'));
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
					{props.userBooks.length > 10 ? <h2>Welcome back, {fullName}!</h2> : <h2>What are you reading?</h2>}
					<p>Search for a book that you want to track and add to shelves.</p>
				</div>
				<SearchForm history={props.history} />
			</div>

			<div className='reading-status-and-my-shelves-container'>
				<div className="reading-status-container">
					
					{
						props.userBooks &&
						props.userBooks.length > 0 &&
						<>
							<StatusShelfCarousel title="In progress" display="card" bookList={inProgress} link="/shelf/inprogress" display="card" breadcrumbs={[{ label: "In progress", path: "/shelf/inprogress" }, { label: "Book details", path: null }]} history={props.history} />
							<StatusShelfCarousel title="To be read" display="card" bookList={toBeRead} breadcrumbs={{ label: "To be read", path: "/shelf/toberead" }, { label: "Book details", path: null }} link="/shelf/toberead" history={props.history} />
							<StatusShelfCarousel title="Finished" display="card" bookList={finished} breadcrumbs={[{ label: "Finished", path: "/shelf/finished" }, { label: "Book details", path: null }]} link="/shelf/finished" history={props.history} />
							<StatusShelfCarousel title="Recommendations" display="carousel" bookList={props.userBooks} breadcrumbs={[{ label: "Recommendations", path: "/shelf/recommendations" }, { label: "Book details", path: null }]} history={props.history} />
						</>
					}
					
					
				</div>

				<MyShelf history={props.history} source={'library'} />
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
