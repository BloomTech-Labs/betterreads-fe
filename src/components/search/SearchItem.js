import React from "react";
import ReactGA from 'react-ga';
import { Event } from '../tracking/';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Axios from 'axios';

const apiURL = "http://localhost:5000/api";

const ResultItem = styled.div`
    display: flex;
    flex-direction: column;
    margin: .5 1rem;
    padding: .5rem;
    border-bottom: 1px solid lightgray;
`;

const ResultHeader = styled.div`
    display: flex;

`;

const ResultThumb = styled.div``;
const ResultTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: .5rem;
`;
const ResultDesc = styled.div``;

const SearchItem = props => {
    const { id, selfLink, volumeInfo, accessInfo, searchInfo } = props.book;

    const saveBookToLibrary = book => {
        const modifiedBook = {
			book: {
				googleId: book.id,
				title: book.volumeInfo.title,
				author: book.volumeInfo.authors.toString(),
				publisher: book.volumeInfo.publisher,
				publishDate: book.volumeInfo.publishedDate,
				description: 'book.volumeInfo.description',
				isbn10: book.volumeInfo.industryIdentifiers[0].identifier,
				isbn13: book.volumeInfo.industryIdentifiers[1].identifier,
				pageCount: book.volumeInfo.pageCount,
				categories: book.volumeInfo.categories.toString(),
				thumbnail: book.volumeInfo.imageLinks.thumbnail,
				smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail,
				language: book.volumeInfo.language,
				webRenderLink: book.accessInfo.webReaderLink,
				textSnippet: book.searchInfo.textSnippet,
				isEbook: book.saleInfo.isEbook
			},
			readingStatus: 1
		};

        Axios.post(`${apiURL}/${localStorage.getItem('user_id')}/library`, modifiedBook, { withCredentials: true })
            .then(res => {
                Event('Search', 'Book added to user library', 'SEARCH_RESULTS');
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <ResultItem link={selfLink}>
            <ResultHeader>
                <ResultThumb>
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}><img src={volumeInfo.imageLinks.smallThumbnail} alt={`${volumeInfo.title} thumbnail`} /></Link>
                    )}
                    <div>
                        <button onClick={() => saveBookToLibrary(props.book)}>Add to Library</button>
                    </div>
                </ResultThumb>

                <ResultTitle>
                    <p>
                        {volumeInfo.title}
                    </p>
                    <p>
                        by{' '}
                        {
                            volumeInfo.authors &&
                            volumeInfo.authors.map(author => (
                                <>{author}{' '}</>
                            ))
                        }
                    </p>
                    <p>
                        {volumeInfo.averageRating}
                    </p>
                </ResultTitle>
            </ResultHeader>

            <ResultDesc>
                {searchInfo && <p>{searchInfo.textSnippet}</p>}
                <p>
                    {/* <a href={accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">Read online</a> */}
                    <ReactGA.OutboundLink eventLabel="Clicked Read Online link" to={accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">Read Online</ReactGA.OutboundLink>
                </p>
            </ResultDesc>
        </ResultItem>
    );
};

export default SearchItem;
