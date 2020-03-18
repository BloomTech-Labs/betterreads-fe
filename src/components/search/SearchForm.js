import React from 'react';
import { connect } from 'react-redux';
import { getGoogleResults, clearSearchResults, setQuery, setBreadcrumbs } from '../../actions';
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

    @media (min-width: 1120px) {
        .innerWrapper {
            width: 1120px;
        }
        .innerWrapper .ant-input-search{
            width: 400px;
        }
    }
`;

const SearchForm = props => {
	const handleChange = e => {
        console.log(e)
		props.setQuery(e.target.value);
	};

	const handleSearch = e => {
        props.getGoogleResults(props.query, 0, 10);
        props.setBreadcrumbs([{ label: 'Search results', path: '/search' }, { label: 'Book details', path: null }]);
        if(props.history.location.pathname !== '/search') props.history.push('/search');
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
                    onPressEnter={handleSearch}
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

export default connect(mapStateToProps, { getGoogleResults, clearSearchResults, setQuery, setBreadcrumbs })(SearchForm);
