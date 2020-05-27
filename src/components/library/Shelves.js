//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import { fetchUsersShelves } from '../../store/actions';
//Import Components
import Header from '../Navigation/Header';
import SearchForm from '../search/SearchForm';
import Breadcrumbs from '../Navigation/Breadcrumbs';
import MyShelves from '../Shelf/MyShelves';
import StatusShelfCarousel from '../Shelf/StatusShelfCarousel';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
//Tracking
import { PageView, Event } from '../../utils/tracking';
//Styling
import ShelvesContainer from './styles/ShelvesStyle';

const Shelves = (props) => {
  useDocumentTitle('Readrr - My Shelves');

  useEffect(() => {
    props.fetchUsersShelves();
    Event('SHELVES', 'A user loaded viewed all of their shelves', 'SHELVES');
    PageView();
  }, []);

  console.log('User Shelves: ', props.userShelves);

  const userBooks = props.userBooks.filter((item) => item);
  const favorites = props.userBooks.filter((item) => item.favorite === true);
  const toBeRead = props.userBooks.filter((item) => item.readingStatus === 1);
  const inProgress = props.userBooks.filter((item) => item.readingStatus === 2);
  const finished = props.userBooks.filter((item) => item.readingStatus === 3);

  return (
    <>
      <Header />
      <SearchForm />
      <Breadcrumbs crumbs={[{ label: 'My shelves', path: null }]} />
      <ShelvesContainer>
        <div className='shelves'>
          <h1>My Shelves</h1>
          <StatusShelfCarousel
            title='My books'
            display='carousel'
            bookList={userBooks}
            link='/shelf/mybooks'
            breadcrumbs={[
              { label: 'My shelves', path: '/myshelves' },
              { label: 'My books', path: '/shelf/mybooks' },
              { label: 'Book details', path: null },
            ]}
          />
          <StatusShelfCarousel
            title='Favorites'
            display='carousel'
            bookList={favorites}
            link='/shelf/favorites'
            breadcrumbs={[
              { label: 'My shelves', path: '/myshelves' },
              { label: 'Favorites', path: '/shelf/favorites' },
              { label: 'Book details', path: null },
            ]}
          />
          <StatusShelfCarousel
            title='To be read'
            display='carousel'
            bookList={toBeRead}
            link='/shelf/toberead'
            breadcrumbs={[
              { label: 'My shelves', path: '/myshelves' },
              { label: 'To be read', path: '/shelf/toberead' },
              { label: 'Book details', path: null },
            ]}
          />
          <StatusShelfCarousel
            title='Reading'
            display='carousel'
            bookList={inProgress}
            link='/shelf/inprogress'
            breadcrumbs={[
              { label: 'My shelves', path: '/myshelves' },
              { label: 'Reading', path: '/shelf/inprogress' },
              { label: 'Book details', path: null },
            ]}
          />
          <StatusShelfCarousel
            title='Finished'
            display='carousel'
            bookList={finished}
            link='/shelf/finished'
            breadcrumbs={[
              { label: 'My shelves', path: '/myshelves' },
              { label: 'Finished', path: '/shelf/finished' },
              { label: 'Book details', path: null },
            ]}
          />
          {props.userShelves.map((item, index) => (
            <StatusShelfCarousel
              key={index}
              id={item.shelfId}
              title={item.shelfName}
              display='carousel'
              bookList={item.books}
              link={`/shelf/${item.shelfId}`}
              breadcrumbs={[
                { label: 'My shelves', path: '/myshelves' },
                { label: item.shelfName, path: `/shelf/${item.shelfId}` },
                { label: 'Book details', path: null },
              ]}
            />
          ))}
        </div>
        <MyShelves source={'shelves'} />
      </ShelvesContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.library.userBooks,
    userShelves: state.library.userShelves,
  };
};

export default connect(mapStateToProps, { fetchUsersShelves })(Shelves);
