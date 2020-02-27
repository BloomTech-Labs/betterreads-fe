import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Event } from '../tracking/';
import { getGoogleResults } from '../../actions'

import { Layout, Form, Icon, Input, Button, Row, Col } from 'antd'

const SearchForm = props => {

    const [searchQ, setSearchQ] = useState({q: ''})

    const handleChange = e => {
        setSearchQ({
            ...searchQ,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
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
        </>
    )

}

const mapStateToProps = state => {
    return {
        fetching: state.fetching,
    }
}

export default connect(mapStateToProps, {getGoogleResults})(SearchForm);