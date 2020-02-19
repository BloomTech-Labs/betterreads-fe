import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';


const Search = () => {
    const [results, setResults] = useState();

    return (
        <>
            <form onSubmit="">
                <input type="text" maxLength="255" placeholder="Title, Author" />
                <button type="submit">Search</button>
            </form>
        </>
    )
}

export default (Search)