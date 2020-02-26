import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PageView, Event } from './tracking/';

const BookDetails = props => {
	const [selectedBook, setSelectedBook] = useState();

	console.log(props, 'props');

	useEffect(() => {
		PageView();
		setSelectedBook(
			props.searchResults.items.find(
				book => book.id === props.match.params.id
			)
		);
	}, []);

	console.log(selectedBook, 'selectedBook');

	return (
		<>
			{selectedBook && (
				<div>
					<img
						src={selectedBook.volumeInfo.imageLinks.thumbnail}
						alt={selectedBook.volumeInfo.title}
					/>
					<div className="libraryStuff">
						<div className="dropDownButton"></div>

						<input
							type="radio"
							id="To Be Read"
							name="gender"
							value="To Be Read"
						/>
						<label htmlFor="To Be Read">To Be Read</label>
						<input
							type="radio"
							id="Reading"
							name="gender"
							value="Reading"
						/>
						<label htmlFor="Reading">Reading</label>
						<input
							type="radio"
							id="Read"
							name="gender"
							value="Read"
						/>
						<label htmlFor="Read">Read</label>
					</div>

					<h2>{selectedBook.volumeInfo.title}</h2>

					<h3>
						<p>
							by
							{selectedBook.volumeInfo.authors.map(A => (
								<p key={A.id}>{A}</p>
							))}
						</p>
					</h3>
					<h3 className="starRating">
						Star Rating
						<form>
							<fieldset>
								<span className="starGroup">
									<input
										type="radio"
										id="rating-1"
										name="rating"
										value="1"
									/>
									<label for="rating-1"></label>
									<input
										type="radio"
										id="rating-2"
										name="rating"
										value="2"
									/>
									<label for="rating-2"></label>
									<input
										type="radio"
										id="rating-3"
										name="rating"
										value="3"
									/>
									<label for="rating-3"></label>
									<input
										type="radio"
										id="rating-4"
										name="rating"
										value="4"
									/>
									<label for="rating-4"></label>
									<input
										type="radio"
										id="rating-5"
										name="rating"
										value="5"
									/>
									<label for="rating-5"></label>
								</span>
							</fieldset>
						</form>
					</h3>
					<p>{selectedBook.volumeInfo.description}</p>
					<p>
						Genre
						{selectedBook.volumeInfo.categories.map(G => (
							<p key={G.id}>{G}, </p>
						))}
					</p>
				</div>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		searchResults: state.searchResults,
		error: state.error,
		fetching: state.fetching
	};
};

export default connect(mapStateToProps)(BookDetails);
