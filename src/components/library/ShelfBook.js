import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks, fetchCurrentBook, setBreadcrumbs, getBooksOnShelves } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import BookCard from '../common/BookCard';
import MyShelves from '../common/MyShelves';
import AddToExistingShelf from '../common/AddToExistingShelf';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import ShelfBookContainer from './styles/ShelfBookStyle';

const ShelfBook = props => {
	useDocumentTitle('Readrr - Book details');

	const [readMore, setReadMore] =  useState(false);

	const googleID = props.match.params.id;
  
	useEffect(() => {
		props.fetchCurrentBook(googleID);
		props.getBooksOnShelves()
	}, []);
	
	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={props.breadcrumbs} />

			<ShelfBookContainer readMore={readMore}>
				<div className='book-details'>
					<BookCard history={props.history} book={props.currentBook} source='search' />

					{
						props.currentBook.description &&
						(
							<div className='description'>
								<p className='heading'>Description</p>
								<div className='content' data-testid='description' dangerouslySetInnerHTML={{__html: props.currentBook.description}}></div>
								<p className='read-more' onClick={() => setReadMore(!readMore)}>{readMore ? 'Read less...' : 'Read more...'}</p>
							</div>
						)
					}
					
					<div className='description' style={{paddingBottom: '1rem'}}>
						<p className='heading' style={{fontSize: '1rem'}}>Information</p>
						<div className="info-container">
							{
								props.currentBook.title &&
								<div className="info-item">
									<div className="info-title">Title:</div>
									<div className="info-value">{props.currentBook.title && props.currentBook.title}</div>
								</div>
							}
							{
								props.currentBook.authors &&
								<div className="info-item">
									<div className="info-title">Author:</div>
									<div className="info-value">{props.currentBook.authors && props.currentBook.authors}</div>
								</div>
							}
							{
								props.currentBook.publisher &&
								<div className="info-item">
									<div className="info-title">Publisher:</div>
									<div className="info-value">{props.currentBook.publisher && props.currentBook.publisher}, {props.currentBook.publishedDate && props.currentBook.publishedDate.split('-')[0]}</div>
								</div>
							}
							{
								props.currentBook.isbn10 || props.currentBook.isbn13 &&
								<div className="info-item">
									<div className="info-title">ISBN:</div>
									<div className="info-value">{props.currentBook.isbn10 && props.currentBook.isbn10}</div>
								</div>
							}
							{
								props.currentBook.pageCount &&
								<div className="info-item">
									<div className="info-title">Length:</div>
									<div className="info-value">{props.currentBook.pageCount && props.currentBook.pageCount} pages</div>
								</div>
							}
						</div>
					</div>

					<AddToExistingShelf bookId={props.match.params.id} />

					{
						props.currentBook.categories && (
							<div className='genre-big-container'>
								<div className='genre-small-container'>
									<p className='heading'>Genres</p>
									<div className='genres'>
										{
											props.currentBook.categories && 
											props.currentBook.categories.split(',').map((item, index) => 
												<p className='genre' key={index}>{item}</p>
											)}
									</div>
								</div>
							</div>
						)
					}
				</div>

				<MyShelves history={props.history} />
			
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

export default connect(mapStateToProps, { fetchUsersBooks, fetchCurrentBook, setBreadcrumbs, getBooksOnShelves })(ShelfBook);
