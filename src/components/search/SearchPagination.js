import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { Pagination } from "antd";

const SearchPaginationContainer = styled.div`
    // .ant-pagination {
    //     margin: 1rem 0;
    // }
`;

const SearchPagination = props => {
    const onChange = pageNumber => {
        console.log('PAGE_NUMBER', pageNumber);
    };
    // start index, max results
    // pageNumber times 10 minus 9
    // start index formula, pageNumber minus 1 times 10

    return (
        <SearchPaginationContainer>
            {props.searchResults.books && <Pagination defaultPageSize={10} total={props.searchResults.books.totalItems} onChange={onChange} />}
        </SearchPaginationContainer>
    );
};

const mapStateToProps = state => {
    return {
        searchResults: state.search.searchResults
    };
};

export default connect(mapStateToProps)(SearchPagination);
