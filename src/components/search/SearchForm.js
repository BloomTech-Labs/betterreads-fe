import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { getGoogleResults } from '../../actions'
import styled from 'styled-components';
import { Input, Row, Col } from 'antd'

const Wrapper = styled.div`
    .ant-btn-primary {
        background-color: #D24719;
        border-color: #D24719;
    }
`;

const SearchForm = props => {

    const [searchQ, setSearchQ] = useState({q: ''})

    const handleChange = e => {
        setSearchQ({
            ...searchQ,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Wrapper>
            <Row type="flex" justify="center" gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}>
                <Col xs={{span: 22}} md={{span: 12}}>
                    <Input.Search name="q"
                        aria-label="search-box"
                        placeholder="Search for a book" 
                        size="large" 
                        onSearch={value => props.getGoogleResults(value)} 
                        value={searchQ.q} 
                        onChange={handleChange} 
                        enterButton
                    />
                </Col>
            </Row>
        </Wrapper>
    )

}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
    }
}

export default connect(mapStateToProps, {getGoogleResults})(SearchForm);