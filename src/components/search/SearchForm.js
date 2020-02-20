import React, { useState } from 'react'
import { connect } from 'react-redux';

import { getGoogleResults } from '../../actions'

const SearchForm = props => {

    const [searchQ, setSearchQ] = useState({q: ''})

    const handleChange = e => {
        setSearchQ({
            ...searchQ,
            [e.target.name]: e.target.value
        })
    }

    const handleSumbit = e => {
        e.preventDefault();
        if(searchQ.q.length){
            props.getGoogleResults(searchQ.q)
        }
    }

    return (
        <form onSubmit={handleSumbit}>
            <input name="q" type="text" maxLength="255" placeholder="Title, Author" value={searchQ.q} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    )

}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
        getGoogleResults: state.getGoogleResults
    }
}

export default connect(mapStateToProps, {getGoogleResults})(SearchForm);