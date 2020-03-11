import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentBook } from '../../actions';
import Header from '../common/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../common/Breadcrumbs';
import ShelfBookContainer from './ShelfBookStyle';
import { Rate } from 'antd';

const ShelfBook = props => {
	const [readMore, setReadMore] =  useState(false);

	const googleID = props.match.params.id;

	useEffect(() => {
		props.fetchCurrentBook(googleID);
	}, []);
	
	return (
		<>
			<Header history={props.history} />
			<SearchForm history={props.history} />
			<Breadcrumbs history={props.history} crumbs={[{ label: 'Search results', path: '/search' }, { label: 'Book details', path: null }]} />

			<ShelfBookContainer readMore={readMore}>

				<div className='book'>
					<div className='thumbnail'>
						<img src={props.currentBook.smallThumbnail} alt='book thumbnail'/>
						{/* dropdown button */}
					</div>
					<div className='information'>
						<div className='top'>
							<div className='title-and-author'>
								<p className='title'>{props.currentBook.title && props.currentBook.title}</p>
								<p className='author'>{props.currentBook.authors && props.currentBook.authors.split(',')[0]}</p>
								{/* multiple authors? */}
							</div>
							{/* heart */}
						</div>
						<div className='bottom'>
							{props.currentBook.averageRating && <Rate allowHalf disabled value={props.currentBook.averageRating} />}
						</div>
					</div>
				</div>

				<div className='description'>
					<p className='heading'>Description</p>
					{/* {props.currentBook.description && <p className='content'>{props.currentBook.description}</p>} */}
					{/* how to make breadcrumbs dynamic? */}
					{/* search shows shelves at the bottom on mobile */}
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

			</ShelfBookContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		currentBook: state.book.currentBook
	};
};

export default connect(mapStateToProps, { fetchCurrentBook })(ShelfBook);
