import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsersBooks } from '../../actions';
import BookCard from '../common/BookCard';
import styled from 'styled-components';

// things to be passed, history, book array, source, width

const BookCardListContainer = styled.div`
    width: 90%;
    margin: 0 auto;

    @media(min-width: 1120px) {
        max-width: 687px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

const BookCardList = props => {
    useEffect(() => {
        props.fetchUsersBooks();
    }, []);

    return (
        <BookCardListContainer>
            {props.userBooks.map((item, index) => (
                <BookCard key={index} history={props.history} book={item} source={props.source} />
            ))}
        </BookCardListContainer>
    );
};

const mapStateToProps = state => {
    return {
        userBooks: state.library.userBooks
    };
};

export default connect(mapStateToProps, { fetchUsersBooks })(BookCardList);