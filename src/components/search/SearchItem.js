import React from "react";
import { Link } from 'react-router-dom';

import styled from 'styled-components';

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

    return (
        <ResultItem key={id} link={selfLink}>
            <ResultHeader>
                <ResultThumb>
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`}><img src={volumeInfo.imageLinks.smallThumbnail} /></Link>
                    )}
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
                <p><a href={accessInfo.webReaderLink} target="_blank">Read online</a></p>
            </ResultDesc>
        </ResultItem>
    );
};

export default SearchItem;
