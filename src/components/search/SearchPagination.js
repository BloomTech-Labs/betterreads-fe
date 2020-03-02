import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Row, Col, Pagination } from "antd";

const Wrapper = styled.div`
    .ant-pagination {
        margin: 1rem 0;
    }
`;

const SearchPagination = (props) => {
    return (
        <Wrapper>
            <Row type='flex' justify='center'>
                <Col span={22}>
                    <Pagination
                        defaultCurrent={1}
                        total={props.searchResults.totalItems}
                    />
                </Col>
            </Row>
        </Wrapper>
    );
};

const mapStateToProps = state => {
    return {
        fetching: state.search.fetching,
        searchResults: state.search.searchResults
    };
};

export default connect(mapStateToProps)(SearchPagination);
