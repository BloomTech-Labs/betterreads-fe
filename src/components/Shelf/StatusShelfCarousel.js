//Import React
import React from 'react';
import { connect } from 'react-redux';
//Import Actions
import {
  setBreadcrumbs,
  deleteShelf,
  fetchUsersShelves,
} from '../../store/actions';
//Import Components
import BookCard from '../Book/BookCard';
import BookCardList from '../Book/BookCardList';
//Styling
import { Carousel } from 'antd';
import { Menu, Dropdown, Popconfirm, message } from 'antd';
import ShelfSwipeContainer from './styles/StatusShelfStyle';
// Utils
import history from '../../utils/history';

const ShelfSwipe = (props) => {
  const carouselProps = {
    dots: false,
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1119,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const confirm = (event) => {
    props.deleteShelf(props.id, history);
    message.success('Successfully deleted shelf');
    props.fetchUsersShelves();
  };

  const cancel = (event) => {
    message.error('Cancelled');
  };

  const dropdown = (
    <Menu>
      <Menu.Item>
        <Popconfirm
          title='Are you sure you want to delete this shelf?'
          onConfirm={confirm}
          onCancel={cancel}
          okText='Yes'
          cancelText='No'
        >
          <a href='#'>
            <i
              className='fas fa-trash'
              style={{ marginRight: '4px', color: '#3b403d' }}
            ></i>
            Delete
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <ShelfSwipeContainer
      length={props.bookList.length}
      data-testid='shelf-swipe-container'
    >
      {/* <Collapse defaultActiveKey={2} bordered={false}>
                <Collapse.Panel header={`${props.title} (${props.bookList.length})`} showArrow={false} key={2}>
                    {props.display === 'carousel' && (
                        <div className='swiper'>
                            <Carousel {...carouselProps}>
                                {props.bookList && props.bookList.splice(0,10).map((book, index) => (
                                    <BookCard key={index} book={book} source="recommendation" />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {props.display === 'card' && <BookCardList books={props.bookList.slice(0,4)} source={'library'} />}
                </Collapse.Panel>
            </Collapse> */}

      <div className='header'>
        {props.title === 'Recommendations' && (
          <p className='status'>{props.title}</p>
        )}
        {props.title === 'My books' ||
        props.title === 'Favorites' ||
        props.title === 'To be read' ||
        props.title === 'In progress' ||
        props.title === 'Finished' ? (
          <p className='status'>
            {props.title} ({props.bookList.length})
          </p>
        ) : null}
        {props.title !== 'My books' &&
        props.title !== 'Favorites' &&
        props.title !== 'To be read' &&
        props.title !== 'In progress' &&
        props.title !== 'Finished' &&
        props.title !== 'Recommendations' ? (
          <p className='status'>
            {props.title} ({props.bookList.length})
            <Dropdown overlay={dropdown} trigger={['click']}>
              <i className='fas fa-ellipsis-h' title='Options'></i>
            </Dropdown>
          </p>
        ) : null}

        {props.link && props.bookList.length > 0 && (
          <p
            className='view-all'
            onClick={() => {
              props.setBreadcrumbs(props.breadcrumbs);
              history.push(props.link);
            }}
          >
            View all
          </p>
        )}
      </div>

      {props.display === 'carousel' && (
        <div className='swiper'>
          <Carousel {...carouselProps}>
            {props.bookList &&
              props.bookList
                .splice(0, 10)
                .map((book, index) => (
                  <BookCard key={index} book={book} source='recommendation' />
                ))}
          </Carousel>
        </div>
      )}

      {props.display === 'card' && (
        <BookCardList books={props.bookList.slice(0, 4)} source={'library'} />
      )}
    </ShelfSwipeContainer>
  );
};

export default connect(null, {
  setBreadcrumbs,
  deleteShelf,
  fetchUsersShelves,
})(ShelfSwipe);
