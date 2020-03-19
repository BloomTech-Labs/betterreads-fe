import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchCurrentBook, setBreadcrumbs } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import BookCard from '../common/BookCard';
import MyShelf from '../common/MyShelf';
import ShelfBookContainer from './styles/ShelfBookStyle';

const ShelfBook = props => {
	const [readMore, setReadMore] =  useState(false);

	const googleID = props.match.params.id;

	useEffect(() => {
		props.fetchUsersBooks();	
		props.fetchCurrentBook(googleID);
	}, []);
	
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
						<div className='content' data-testid='description' dangerouslySetInnerHTML={{__html: props.currentBook.description}}></div>
						<p className='read-more' onClick={() => setReadMore(!readMore)}>{readMore ? 'Read less...' : 'Read more...'}</p>
					</div>

					<div className='genre-big-container'>
						<div className='genre-small-container'>
							<p className='heading'>Genres</p>
							<div className='genres'>
								{props.currentBook.categories && props.currentBook.categories.split(',').map((item, index) => <p className='genre' key={index}>{item}</p>)}
							</div>
						</div>
					</div>
				</div>

				<MyShelf history={props.history} />
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

export default connect(mapStateToProps, { fetchUsersBooks, fetchCurrentBook, setBreadcrumbs })(ShelfBook);
