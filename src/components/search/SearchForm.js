import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getGoogleResults } from '../../actions'
import styled from 'styled-components';
import { Input, Row, Col } from 'antd'

const Wrapper = styled.div`
    // width: 90%;
    // margin: 0 auto;

    .ant-btn-primary {
        background-color: #547862;
        border-color: #547862;
    }
`;

const SearchForm = props => {
    const [searchQ, setSearchQ] = useState({q: ''})

    const handleChange = e => {
        if(searchQ.q.length){
            props.getGoogleResults(e.target.value);
        }
        setSearchQ({
            ...searchQ,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <Wrapper>    
            <Input.Search name="q"
                aria-label="search-box"
                placeholder="Search for a book" 
                size="large"
                onSearch={value => props.getGoogleResults(value)}
                onEnter={value => props.getGoogleResults(value)}
                value={searchQ.q} 
                onChange={handleChange} 
                enterButton
            />
        </Wrapper>
    )

}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
    }
}

export default connect(mapStateToProps, { getGoogleResults })(SearchForm);
