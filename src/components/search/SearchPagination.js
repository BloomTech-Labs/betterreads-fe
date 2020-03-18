import React from 'react';
import { connect } from "react-redux";
import { getGoogleResults } from '../../actions';
import styled from "styled-components";

const SearchPaginationContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    button {
        width: 100%;
        padding: 10px;
        margin-top: 16px;
        background: #ffffff;
        border: 1px solid #D9D9D9;
        border-radius: 4px;
        font-family: 'Open Sans', sans-serif;
        font-size: 1rem;
        font-weight: bold;
        color: #547862;
    }
`;

const SearchPagination = props => {
    const onClick = () => {
        // start index, max results
        // pageNumber times 10 minus 9
        // start index formula, pageNumber minus 1 times 10
    };

    return (
        <SearchPaginationContainer>
            <button>Load More</button>
        </SearchPaginationContainer>
    );
};

export default connect(null)(SearchPagination);