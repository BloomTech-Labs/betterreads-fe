//Import React
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  fetchUsersBooks,
  setBreadcrumbs,
  fetchRecommendations,
  getUserShelves,
} from '../../store/actions';
//Import Components
import CreateNewShelfModal from './CreateNewShelfModal';
import MyShelvesContainer from './styles/MyShelvesContainer';
import BookIcon from '../Book/BookIcon';
// History Util
import history from '../../utils/history';

const MyShelves = (props) => {
  useEffect(() => {
    props.fetchUsersBooks();
    props.fetchRecommendations();
    props.getUserShelves();
  }, []);

  const inProgress = props.userBooks.filter((item) => item.readingStatus === 2);
  const toBeRead = props.userBooks.filter((item) => item.readingStatus === 1);

  return (
    <MyShelvesContainer source={props.source}>
      <div className='my-shelves'>
        <h2 onClick={() => history.push('/myshelves')} data-testid='h2-link'>
          My Shelves <i className='fas fa-chevron-right'></i>
        </h2>
        <p className='create-shelves'>
          Create shelves and add books to your custom shelf.
        </p>
        <CreateNewShelfModal button={true} />

        <div className='shelves-container'>
          <div
            data-testid='progress-div'
            className='shelf'
            onClick={() => {
              props.setBreadcrumbs([
                { label: 'Reading', path: '/shelf/inprogress' },
                { label: 'Book details', path: null },
              ]);
              history.push('/shelf/inprogress');
              window.location.reload();
            }}
          >
            <p className='shelf-name'>Reading</p>
            {inProgress.length > 0 ? (
              <div className='thumbnails'>
                {inProgress
                  .filter((item) => item.thumbnail !== null)
                  .slice(0, 3)
                  .map((item, index) => (
                    <img
                      key={index}
                      src={item.thumbnail || item.smallThumbnail}
                      alt={item.title}
                    />
                  ))}
              </div>
            ) : (
              <BookIcon height='40px' width='40px' fill='#d9d9d9' />
            )}
            {inProgress.length === 1 ? (
              <p className='shelf-quantity'>1 book</p>
            ) : (
              <p className='shelf-quantity'>{inProgress.length} books</p>
            )}
          </div>

          <div
            data-testid='to-be-div'
            className='shelf'
            onClick={() => {
              props.setBreadcrumbs([
                { label: 'To be read', path: '/shelf/toberead' },
                { label: 'Book details', path: null },
              ]);
              history.push('/shelf/toberead');
              window.location.reload();
            }}
          >
            <p className='shelf-name'>To be read</p>
            {toBeRead.length > 0 ? (
              <div className='thumbnails'>
                {toBeRead
                  .filter((item) => item.thumbnail !== null)
                  .slice(0, 3)
                  .map((item, index) => (
                    <img
                      key={index}
                      src={item.thumbnail || item.smallThumbnail}
                      alt={item.title}
                    />
                  ))}
              </div>
            ) : (
              <BookIcon height='40px' width='40px' fill='#d9d9d9' />
            )}
            {toBeRead.length === 1 ? (
              <p className='shelf-quantity'>1 book</p>
            ) : (
              <p className='shelf-quantity'>{toBeRead.length} books</p>
            )}
          </div>

          <div
            data-testid='my-books'
            className='shelf'
            onClick={() => {
              props.setBreadcrumbs([
                { label: 'My books', path: '/shelf/mybooks' },
                { label: 'Book details', path: null },
              ]);
              history.push('/shelf/mybooks');
              window.location.reload();
            }}
          >
            <p className='shelf-name'>My books</p>
            {props.userBooks.length > 0 ? (
              <div className='thumbnails'>
                {props.userBooks
                  .filter((item) => item.thumbnail !== null)
                  .slice(0, 3)
                  .map((item, index) => (
                    <img key={index} src={item.thumbnail} alt={item.title} />
                  ))}
              </div>
            ) : (
              <BookIcon
                data-testid='book-icon'
                height='40px'
                width='40px'
                fill='#d9d9d9'
              />
            )}
            {props.userBooks.length === 1 ? (
              <p className='shelf-quantity'>1 book</p>
            ) : (
              <p className='shelf-quantity'>{props.userBooks.length} books</p>
            )}
          </div>
        </div>
      </div>
    </MyShelvesContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userBooks: state.library.userBooks,
  };
};

export default connect(mapStateToProps, {
  fetchUsersBooks,
  setBreadcrumbs,
  fetchRecommendations,
  getUserShelves,
})(MyShelves);
