import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs} from '../../actions/bookActions';
import BookCard from './BookCard';
import BookCardList from './BookCardList';
import { Carousel } from 'antd';
import styled from 'styled-components'

const ShelfSwipeContainer = styled.div`
    padding-top: 12px;
    border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
    display: flex;
    flex-direction: column;

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

    return (
        <ShelfSwipeContainer length={props.bookList.length}>
            <div className='header'>
                {props.title !== 'Recommendations' ? <p className='status'>{props.title}  ({props.bookList.length})</p> : <p className='status'>{props.title}</p>}
                
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

            {props.display === 'card' && <BookCardList history={props.history} books={props.bookList} source={'library'} />}
        </ShelfSwipeContainer>
    );
};

export default connect(null, { setBreadcrumbs })(ShelfSwipe);