import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchCurrentBook } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import BookCard from '../search/_SearchAgain';
import ShelfBookContainer from './ShelfBookStyle';
import BookIcon from '../common/BookIcon';

const ShelfBook = props => {
	const [readMore, setReadMore] =  useState(false);

	const googleID = props.match.params.id;

	useEffect(() => {
		props.fetchUsersBooks();
		props.fetchCurrentBook(googleID);
	}, []);

	const favorites = props.userBooks.filter(item => item.favorite === true);
	
	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={props.breadcrumbs} />

			<ShelfBookContainer readMore={readMore}>

				<div className='book-details'>
					<BookCard history={props.history} book={props.currentBook} source='search' />

					<div className='description'>
						<p className='heading'>Description</p>
						<div className='content' dangerouslySetInnerHTML={{__html: props.currentBook.description}}></div>
						<p className='read-more' onClick={() => setReadMore(!readMore)}>{readMore ? 'Read less...' : 'Read more...'}</p>
					</div>

					<div className='genre-big-container'>
						<div className='genre-small-container'>
							<p className='heading'>Genres</p>
							<div className='genres'>
								{props.currentBook.categories && props.currentBook.categories.split(',').map(item => <p className='genre'>{item}</p>)}
							</div>
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
							<BookIcon height="40px" width="40px" fill="#d9d9d9" />
							{favorites.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{favorites.length} books</p>}
						</div>
					</div>
				</div>

			</ShelfBookContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		currentBook: state.book.currentBook,
		breadcrumbs: state.book.breadcrumbs
	};
};

export default connect(mapStateToProps, { fetchUsersBooks, fetchCurrentBook })(ShelfBook);
