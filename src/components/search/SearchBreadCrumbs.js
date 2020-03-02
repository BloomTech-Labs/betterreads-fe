import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Breadcrumb } from 'antd';

import { HomeOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    
    .fs-16{font-size: 16px;}

    .openSans{font-family: 'Open Sans', sans-serif;}
    .lh-40{line-height: 40px;}

    .innerWrapper{
        width: 90%;
        margin: 0 auto;
    }
`;

const ResultCount = styled.div`
    background-color: rgba(217, 217, 217,0.5);
    
    .openSans{font-family: 'Open Sans', sans-serif;}
    .fs-16{font-size: 16px;}
    .lh-40{line-height: 40px;}

    .innerWrapper {
        width: 90%;
        margin: 0 auto;
    }
`;

const SearchBreadcrumb = props => {
    return (
        <>
            <Wrapper>
                <div className="innerWrapper">
                    <Breadcrumb className="fs-16 openSans lh-40">
                        <Breadcrumb.Item href="/"><HomeOutlined /> Library</Breadcrumb.Item>
                        <Breadcrumb.Item>Search Results</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </Wrapper>
            { props.searchResults && props.searchResults.books && (
                <ResultCount>
                    <div className="innerWrapper fs-16 lh-40 openSans">
                        {props.searchResults.books.totalItems} results for "{props.searchResults.query}"
                    </div>
                </ResultCount>
            )}
        </>
    )
}

const mapStateToProps = state => {
    return {
        fetching: state.search.fetching,
        searchResults: state.search.searchResults
    }
}

export default connect(mapStateToProps)(SearchBreadcrumb);