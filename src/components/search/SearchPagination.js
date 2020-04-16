import React from 'react';
import { connect } from "react-redux";
import { loadMore } from '../../store/actions';
import styled from "styled-components";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Event } from '../../utils/tracking';

const SearchPaginationContainer = styled.div`
    margin-bottom: 32px;

    button {
        height: 46px;
        width: 100%;
        padding: 10px;
        margin-top: 12px;
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
        button {
            margin-bottom: 64px;
        }
    }
`;

const SearchPagination = props => {
    const onClick = () => {
        props.loadMore(props.query, props.searchResults.books.items.length);
        Event('SEARCH', `User loaded page ${(props.searchResults.books.items.length/10)+1}, for more results.`, 'SEARCH_PAGINATION');
    };

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <SearchPaginationContainer>
            <button onClick={onClick} disabled={props.fetchMore ? true : false}>{props.fetchMore ? <Spin indicator={antIcon} /> : 'Load More'}</button>
        </SearchPaginationContainer>
    );
};

const mapStateToProps = state => {
    return {
        fetchMore: state.search.fetchMore,
        searchResults: state.search.searchResults,
        query: state.search.query
    };
};

export default connect(mapStateToProps, { loadMore })(SearchPagination);