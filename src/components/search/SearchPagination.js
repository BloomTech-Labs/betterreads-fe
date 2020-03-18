import React from 'react';
import { connect } from "react-redux";
import { loadMore } from '../../actions';
import styled from "styled-components";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SearchPaginationContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    button {
        height: 46px;
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
        cursor: pointer;

        .anticon-spin {
            fill: #547862;
        }
    }

    @media (min-width: 1120px) {
        width: 100%;
        margin: 0;

        button {
            margin-bottom: 64px;
        }
    }
`;

const SearchPagination = props => {
    const onClick = () => {
        // start index, max results
        // pageNumber times 10 minus 9
        // start index formula, pageNumber minus 1 times 10
        props.loadMore(props.query, props.searchResults.books.items.length);
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <SearchPaginationContainer>
            <button onClick={onClick} disabled={props.fetching ? true : false}>{props.fetching ? <Spin indicator={antIcon} /> : 'Load More'}</button>
        </SearchPaginationContainer>
    );
};

const mapStateToProps = state => {
    return {
        fetching: state.search.fetching,
        searchResults: state.search.searchResults,
        query: state.search.query
    };
};

export default connect(mapStateToProps, { loadMore })(SearchPagination);