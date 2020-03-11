import React from 'react';
import { connect } from 'react-redux';
import {
	fetchUsersBooks,
	fetchUsersShelves,
	getGoogleResults
} from '../../actions/index';
import Shelf from './Shelf'

import styled from 'styled-components';
import BookIcon from './BookIcon';
import { Button } from 'antd';

const Wrapper = styled.div`
    width: 90%;
    margin: 0 auto;

    .frank{font-family: 'Frank Ruhl Libre', sans-serif;}
    .openSans{font-family: 'Open Sans', sans-serif;}

    .goodReadOrange{color: #D24719;}

    .fs-16{font-size: 1rem;}
    .fw-600{font-weight: 600;}
    .lh-22{line-height: 22px;}
    .lh-30{line-height: 30px;}

    .hideOnMobile{display: none;}

    h2 {
        margin-top: 24px;
        margin-bottom: 4px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #547862;
        line-height: 30px;
    }

    .create-shelves {
        margin-bottom: 8px;
        font-size: 1rem;
        color: #4E4C4A;
    }

    .create-new-shelf-button {
        border: 1px solid #d24719;
        border-radius: 4px;
        margin-bottom: 16px;
        width: 220px;
    }

    .shelves-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .search-magic{
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 1120px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .hideOnMobile{display: block;}
        .create-new-shelf-button{
            width: 162px;
        }
        .shelves-container {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
`;

const MyShelf = props => {
    const favorite = props.userBooks.filter(item => item.favorite === true);
    const inProgress = props.userBooks.filter(item => item.readingStatus === 2);
    const toBeRead = props.userBooks.filter(item => item.readingStatus === 1);
    const finished = props.userBooks.filter(item => item.readingStatus === 3);

    //console.log(props, "SC props")
    return (
        <Wrapper>
            <div className="searchMagic">
                <h2 className="lh-30 frank">My Shelves</h2>
                <p className="create-shelves openSans lh-22">
                    Create shelves and add <br className="hideOnMobile" /> books to your custom shelves.
                </p>
                {/* <Button danger default className="create-new-shelf-button openSans fs-16 fw-600 goodReadOrange">Create new shelf</Button> */}
            </div>
            
            <div className="shelves-container">
                <Shelf history={props.history} name="All Books" link="/shelf/allbooks" count={props.userBooks.length || `0`} />
                <Shelf history={props.history} name="Favorites" link="/shelf/favorites" count={favorite.length || `0`} />
            </div>
        </Wrapper>
    )
}

const mapStateToProps = state => {
	return {
		userBooks: state.library.userBooks,
		userShelves: state.library.userShelves
	};
};

export default connect(mapStateToProps, {
	fetchUsersBooks,
	fetchUsersShelves,
	getGoogleResults
})(MyShelf);