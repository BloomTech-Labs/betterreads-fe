import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs, deleteShelf, fetchUsersShelves } from '../../store/actions';
import BookCard from '../Book/BookCard';
import BookCardList from '../Book/BookCardList';
import { Carousel } from 'antd';
import styled from 'styled-components'
import { Menu, Dropdown, Popconfirm, message } from 'antd';

const ShelfSwipeContainer = styled.div`
    padding-top: 12px;
    border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
    display: flex;
    flex-direction: column;

    .ant-collapse {
        background-color: transparent;

        .ant-collapse-item.ant-collapse-no-arrow{
            .ant-collapse-header {
                padding: 0;
                width: 90%;
                margin: 0 auto;
                font-family: 'Frank Ruhl Libre', sans-serif;
                font-size: 1.25rem;
                font-weight: bold;
                color: #4e4c4a;
                line-height: 3rem;
            }
        }
        
        .ant-collapse-content {
            .ant-collapse-content-box {
                padding: 0 !important;
            }
        }
    }

    .header {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .status {
            margin-bottom: 0;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 1.25rem;
            font-weight: bold;
            color: #4e4c4a;

            i {
                margin-left: 8px;
                font-size: 1rem;
                color: #3b403d;
                cursor: pointer;
            }
        }

        .view-all {
            margin-bottom: 0;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: #868585;
            cursor: pointer;
        }
    }

    .swiper {
        padding-bottom: ${props => props.length > 0 ? '16px' : '0'};

        .ant-carousel {
            width: 90% !important;
            margin: 0 auto;
            
            @media(min-width: 1120px) {
                width: 100% !important;
            }

            .slick-dots li button {
                background-color: #D24719 !important;
            }

            .slick-slide {
                & > div > div {
                    width: 102px !important;
                }
            }
        }

        .thumbnail-container {
            width: 104px !important;
        }

        .thumbnail {
            height: 136px !important;
            width: 102px !important;
            border-radius: 5px 5px 0 0 !important;
        }

        button {
            width: 102px !important;
            border-radius: 0 0 5px 5px !important;
        }
    }

    @media (min-width: 1120px) {
        .header {
            width: 100%;
            margin-right: 0;
            margin-left: 0;
        }

        .ant-collapse-item.ant-collapse-no-arrow{
            .ant-collapse-header {
                width: 100% !important;
            }
        }
    }
`;

const ShelfSwipe = props => {
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
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const confirm = event => {
        props.deleteShelf(props.id, props.history)
        message.success('Successfully deleted shelf');
        props.fetchUsersShelves();
    };

    const cancel = event => {
        message.error('Cancelled');
    };

    const dropdown = (
        <Menu>
            <Menu.Item>
                <Popconfirm title='Are you sure you want to delete this shelf?' onConfirm={confirm} onCancel={cancel} okText='Yes' cancelText='No'>
                    <a href='#'><i className='fas fa-trash' style={{ marginRight: '4px', color: '#3b403d' }}></i>Delete</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    return (
        <ShelfSwipeContainer length={props.bookList.length}>
            {/* <Collapse defaultActiveKey={2} bordered={false}>
                <Collapse.Panel header={`${props.title} (${props.bookList.length})`} showArrow={false} key={2}>
                    {props.display === 'carousel' && (
                        <div className='swiper'>
                            <Carousel {...carouselProps}>
                                {props.bookList && props.bookList.splice(0,10).map((book, index) => (
                                    <BookCard key={index} book={book} source="recommendation" history={props.history} />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {props.display === 'card' && <BookCardList history={props.history} books={props.bookList.slice(0,4)} source={'library'} />}
                </Collapse.Panel>
            </Collapse> */}

            <div className='header'>
                {props.title === 'Recommendations' && <p className='status'>{props.title}</p>}
                {
                    props.title === 'My books' ||
                    props.title === 'Favorites' ||
                    props.title === 'To be read' ||
                    props.title === 'In progress' ||
                    props.title === 'Finished' ? <p className='status'>{props.title} ({props.bookList.length})</p> : null
                }
                {
                    props.title !== 'My books' &&
                    props.title !== 'Favorites' &&
                    props.title !== 'To be read' &&
                    props.title !== 'In progress' &&
                    props.title !== 'Finished' &&
                    props.title !== 'Recommendations' ? (
                        <p className='status'>{props.title} ({props.bookList.length})
                            <Dropdown overlay={dropdown} trigger={['click']}>
                                <i className='fas fa-ellipsis-h' title='Options'></i>
                            </Dropdown>
                        </p>
                    ) : null
                }

                {props.link && props.bookList.length > 0 && (
                    <p className='view-all' onClick={() => {
                        props.setBreadcrumbs(props.breadcrumbs);
                        props.history.push(props.link)
                    }}>View all</p>
                )}
            </div>

            {props.display === 'carousel' && (
                <div className='swiper'>
                    <Carousel {...carouselProps}>
                        {props.bookList && props.bookList.splice(0,10).map((book, index) => (
                            <BookCard key={index} book={book} source="recommendation" history={props.history} />
                        ))}
                    </Carousel>
                </div>
            )}

            {props.display === 'card' && <BookCardList history={props.history} books={props.bookList.slice(0,4)} source={'library'} />}
        </ShelfSwipeContainer>
    );
};

export default connect(null, { setBreadcrumbs, deleteShelf, fetchUsersShelves })(ShelfSwipe);
