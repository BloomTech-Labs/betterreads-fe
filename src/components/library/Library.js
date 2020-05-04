//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  fetchUsersBooks,
  fetchUsersShelves,
  setBreadcrumbs,
  fetchRecommendations,
} from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import MyShelves from '../Shelf/MyShelves';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import StatusShelfLoading from '../Shelf/StatusShelfLoading';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
//Styling
import LibraryContainer from './styles/LibraryStyle';
// Utils
import { PageView, Event } from '../../utils/tracking';

const Library = (props) => {
  useDocumentTitle('Readrr - Library');

  useEffect(() => {
    props.setBreadcrumbs([{ label: 'Book details', path: null }]);
    Event('Library', 'User library loaded', 'LIBRARY');
    PageView();
  }, []);

  const localName = 'Readrr';

  const fullName = localName ? localName.split(' ')[0] : 'Readrr';
  const toBeRead = props.userBooks.filter((item) => item.readingStatus === 1);
  const inProgress = props.userBooks.filter((item) => item.readingStatus === 2);

  return (
    <LibraryContainer>
      <Header />

      <div className='what-are-you-reading-container'>
        <div className='what-are-you-reading'>
          {props.userBooks.length > 10 ? (
            <h2 data-testid='welcome-message'>Welcome back, {fullName}!</h2>
          ) : (
            <h2>What are you reading?</h2>
          )}
          <p>Search for a book that you want to track and add to shelves.</p>
        </div>
        <SearchForm />
      </div>

      <div className='reading-status-and-my-shelves-container'>
        <div className='reading-status-container'>
          {props.userBooks && (
            <>
              <StatusShelfCarousel
                title='In progress'
                display='card'
                bookList={inProgress}
                link='/shelf/inprogress'
                breadcrumbs={[
                  { label: 'In progress', path: '/shelf/inprogress' },
                  { label: 'Book details', path: null },
                ]}
              />
              <StatusShelfCarousel
                title='To be read'
                display='card'
                bookList={toBeRead}
                breadcrumbs={[
                  { label: 'To be read', path: '/shelf/toberead' },
                  { label: 'Book details', path: null },
                ]}
                link='/shelf/toberead'
              />
              {props.recommendations && props.recommendations.length > 0 ? (
                <StatusShelfCarousel
                  title='Recommendations'
                  display='carousel'
                  bookList={props.recommendations}
                  breadcrumbs={[
                    {
                      label: 'Recommendations',
                      path: '/shelf/recommendations',
                    },
                    { label: 'Book details', path: null },
                  ]}
                />
              ) : (
                <StatusShelfLoading />
              )}
            </>
          )}
        </div>

        <MyShelves source={'library'} />
      </div>
    </LibraryContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.library.userBooks,
    userShelves: state.library.userShelves,
    recommendations: state.recommendations.recommendations,
  };
};

export default connect(mapStateToProps, {
  fetchUsersBooks,
  fetchUsersShelves,
  setBreadcrumbs,
  fetchRecommendations,
})(Library);
