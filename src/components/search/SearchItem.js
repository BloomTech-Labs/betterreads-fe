import React from "react";
import ReactGA from 'react-ga';
import { Event } from '../tracking/';
import { Link } from 'react-router-dom';

import { Row, Col, Button, Icon, Rate, Select } from 'antd';

import styled from 'styled-components';
import Axios from 'axios';

const apiURL = "http://localhost:5000/api";

const Wrapper = styled.div`
    .ant-row-flex{
        padding: .5rem 0;
    }

    .smallThumbnail {
        border-radius: 5px 5px 0 0;
    }

    .ant-btn {
        position: relative;
        top: -28px;
        color: #F7F7F7;
        width: 125px;
        background: #EA7751;
        border: none;
        border-radius: 0 0 5px 5px;
    }

    .ant-select-selection {
        border: 0 rgba(0,0,0,0);
        background-color: rgba(0,0,0,0);
    }
`

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
        <Wrapper>
            <Row type="flex" justify="center" gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                <Col xs={9}>
                    {volumeInfo.imageLinks && (
                        <Link to={`/Book/${id}`} onClick={() => Event('Book', 'User clicked for book details', 'SEARCH_RESULTS')}>
                            <img className="smallThumbnail" src={volumeInfo.imageLinks.smallThumbnail} alt={`${volumeInfo.title} thumbnail`} width="125" />
                        </Link>
                    )}
                    <Button onClick={() => saveBookToLibrary(props.book)}><Icon type="book" /> Add to Shelf</Button>
                    {/* <ReactGA.OutboundLink eventLabel="Clicked Read Online link" to={accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">Read Online</ReactGA.OutboundLink> */}
                </Col>
                <Col xs={13} className="bookDetail">
                    <div className="fs-16">{volumeInfo.title}</div>
                    <div className="bookAuthors">
                        {
                            volumeInfo.authors &&
                            volumeInfo.authors.map((author, index) => (
                                <div key={index}>
                                    { index === 0 && 'by' } {author}</div>
                            ))
                        }
                    </div>
                    <div className="bookRating">
                        <Rate allowHalf defaultValue={volumeInfo.averageRating} />
                    </div>
                    <div className="track">
                        <Select defaultValue="Track this book">
                           <option value="0">To be read</option>
                           <option value="1">Finished</option>
                           <option value="2">In Progress</option>
                        </Select>
                    </div>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default SearchItem;
