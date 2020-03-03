import React from 'react';
import { connect } from 'react-redux';
import { getGoogleResults, clearSearchResults, setQuery } from '../../actions';
import styled from 'styled-components';
import { Input } from 'antd';

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
	const handleChange = e => {
		props.setQuery(e.target.value);
	};

	const handleSearch = e => {
		props.getGoogleResults(props.query);
	};

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
                    value={props.query}
                    enterButton
                />
            </div>
        </Wrapper>
	);
};

const mapStateToProps = state => {
	return {
		fetching: state.search.fetching,
		query: state.search.query
	};
};

export default connect(mapStateToProps, {
	getGoogleResults,
	clearSearchResults,
	setQuery
})(SearchForm);
