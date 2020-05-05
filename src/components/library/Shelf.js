//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import { setCurrentShelf } from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import BookCardList from '../Book/BookCardList';
import MyShelves from '../Shelf/MyShelves';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import StatusShelfLoading from '../Shelf/StatusShelfLoading';

// Utils
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
//Tracking
import { PageView, Event } from '../../utils/tracking';
//Styling
import ShelfContainer from './styles/ShelfStyle';
import RecsStyle from './styles/RecsStyle';

const Shelf = (props) => {
  useDocumentTitle('Readrr - Shelf');

  const shelf = props.match.params.shelf;
  const [recs, setRecs] = React.useState([]);

  const googleID = 'DGSsCwAAQBAJ';
  const DS_API = process.env.REACT_APP_API_URL || 'https://api.readrr.app';
  const readrrDSURL = 'https://readrr-heroku-test.herokuapp.com/search';

  const fetchSpecificRecommendations = (books) => {
    axiosWithAuth()
      .post(`${DS_API}/api/${props.subject}/recommendations`, { books: books })
      .then((response) =>
        setRecs(response.data.recommendations.recommendations)
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    props.setCurrentShelf(shelf);
    Event('Shelf', 'A user looked at a shelf of books', 'SHELF');
    PageView();
  }, []);

  const books = props.currentShelf.books;
  fetchSpecificRecommendations(books);

  return (
    <>
      <Header />
      <SearchForm />
      <Breadcrumbs crumbs={[{ label: props.currentShelf.name, path: null }]} />
      <RecsStyle>
        {recs.length > 0 ? (
          <StatusShelfCarousel
            title={`Recs`}
            shelf={props.currentShelf.name ? props.currentShelf.name : ''}
            display='carousel'
            bookList={recs}
            style={{ width: '100%' }}
            breadcrumbs={[
              {
                label: `Recommendations`,
                path: '/shelf/recommendations',
              },
              { label: 'Book details', path: null },
            ]}
          />
        ) : (
          <StatusShelfLoading
            title={`Recommendations based on ${props.currentShelf.name ? props.currentShelf.name : ''}`}
          />
        )}
      </RecsStyle>
      <ShelfContainer>
        {props.currentShelf &&
          props.currentShelf.name &&
          props.currentShelf.books && (
            <BookCardList
              books={props.currentShelf.books}
              source={'library'}
              label={props.currentShelf.name}
            />
          )}
        <MyShelves source={'shelf'} />
      </ShelfContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentShelf: state.library.currentShelf,
    subject: state.authentication.user.subject,
  };
};

export default connect(mapStateToProps, { setCurrentShelf })(Shelf);
