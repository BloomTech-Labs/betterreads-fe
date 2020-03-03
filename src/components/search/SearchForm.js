import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getGoogleResults, clearSearchResults } from '../../actions'
import styled from 'styled-components';
import { Input } from 'antd'

const Wrapper = styled.div`
    background-color: #f3f6f5;
    padding: 16px 0;
    
    .innerWrapper {
        width: 90%;
        margin: auto;

        .ant-btn-primary {
            background-color: #547862;
            border-color: #547862;
        }    
    }
    
`;

const SearchForm = props => {
    const [searchQ, setSearchQ] = useState({q: ''})

    const handleChange = e => {
        setSearchQ({
            ...searchQ,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSearch = e => {
        if(e.length){
            props.getGoogleResults(searchQ.q );
        }else{
            setSearchQ({q: ''});
            props.clearSearchResults();
        }
    }

    return (
        <Wrapper>
            <div className="innerWrapper">
                <Input.Search name="q"
                    allowClear
                    aria-label="search-box"
                    placeholder="Search for a book" 
                    size="large"
                    onSearch={handleSearch}
                    onEnter={handleSearch}
                    onChange={handleChange}
                    value={searchQ.q}
                    enterButton
                />
            </div>
        </Wrapper>
    )

}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
    }
}

export default connect(mapStateToProps, { getGoogleResults, clearSearchResults })(SearchForm);
