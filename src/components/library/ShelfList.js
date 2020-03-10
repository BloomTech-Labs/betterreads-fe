import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks } from '../../actions'
import ShelfNote from '../common/ShelfNote';
import ShelfItem from './ShelfItem';
import ShelfListContainer from './ShelfListStyle';
import BookIcon from '../common/BookIcon';

const ShelfList = props => {
	const [currentShelf, setCurrentShelf] = useState([]);

	useEffect(() => {
		props.fetchUsersBooks(localStorage.getItem('id'));

		if (props.shelf === 'allbooks') {
			setCurrentShelf(props.userBooks);
		} else if (props.shelf === 'favorites') {
			setCurrentShelf(props.userBooks.filter(item => item.favorite === true));
		} else if (props.shelf === 'toberead') {
			setCurrentShelf(props.userBooks.filter(item => item.readingStatus === 1));
		} else if (props.shelf === 'inprogress') {
			setCurrentShelf(props.userBooks.filter(item => item.readingStatus === 2));
		} else if (props.shelf === 'finished') {
			setCurrentShelf(props.userBooks.filter(item => item.readingStatus === 3));
		} else {
			// fetch custom shelf books here
		};
	}, [props.shelf]);

	const favorites = props.userBooks.filter(item => item.favorite == true);

	return (
		<>
			<ShelfNote type="allbooks" count={props.userBooks.length} />
			<ShelfListContainer>
				<div className='shelf-item-and-my-shelves-container'>

					<div className="shelf-item-container">
						<div className="shelf-items">
							{currentShelf.map((book, index) => (
								<ShelfItem key={index} book={book} />
							))}
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
								{props.userBooks.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{props.userBooks.length} books</p>}
							</div>

							<div className="shelf">
								<p className="shelf-name" onClick={() => props.history.push('/shelf/favorites')}>Favorites</p>
								<BookIcon height="40px" width="40px" fill="#d9d9d9" />
								{favorites.length === 1 ? <p className="shelf-quantity">1 book</p> : <p className="shelf-quantity">{favorites.length} books</p>}
							</div>
						</div>
					</div>

				</div>
			</ShelfListContainer>
		</>
	);
};

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks
	};
};

export default connect(mapStateToProps, { fetchUsersBooks })(ShelfList);
