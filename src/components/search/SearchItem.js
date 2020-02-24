import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import Axios from 'axios';

import { saveBookToLibrary} from '../../actions'

// const apiURL = "http://localhost:5000/api";

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
        props.saveBookToLibrary(1, book.id, book);
        // Axios.post(`${apiURL}/1/library/${book.id}`, book)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }

    return (
        <ResultItem link={selfLink}>
            <ResultHeader>
                <ResultThumb>
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`}><img src={volumeInfo.imageLinks.smallThumbnail} alt={`${volumeInfo.title} thumbnail`} /></Link>
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
                <p><a href={accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">Read online</a></p>
            </ResultDesc>
        </ResultItem>
    );
};

// export default SearchItem;

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
        getGoogleResults: state.getGoogleResults,
        saveBookToLibrary: state.saveBookToLibrary,
        searchResults: state.searchResults
    }
}

export default connect(mapStateToProps, {saveBookToLibrary})(SearchItem);
