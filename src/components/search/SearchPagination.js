//Import React
import React from 'react';
import { connect } from "react-redux";
//Import Actions
import { loadMore } from '../../store/actions';
//Styling
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SearchPaginationContainer from "./styles/SearchPaginationStyle";
//Tracking
import { Event } from '../../utils/tracking';

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