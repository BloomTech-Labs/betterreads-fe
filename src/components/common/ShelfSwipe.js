import React from 'react';
import { useDispatch } from 'react-redux';
import BookCard from './BookCard';
import { Carousel } from 'antd';
import styled from 'styled-components'

const Swiper = styled.div`
    .ant-carousel{
        width: 90% !important;
        margin: 0 auto;
        
        .slick-dots li button {
            background-color: #D24719 !important;
        }

        .slick-slide {
            & > div > div {
                width: 102px !important;
            }
        }
    }

    .thumbnail-container{
        width: 104px !important;
    }

    .thumbnail{
        height: 136px !important;
        width: 102px !important;
        border-radius: 5px 5px 0 0 !important;
    }
    
    button {
        width: 102px !important;
        border-radius: 0 0 5px 5px !important;
    }
`;

const ShelfSwipe = (props) => {
    const dispatch = useDispatch();

    const carouselProps = {
        dots: false,
        infinite: false,
        swipeToSlide: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1119,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <div className="reading-status">
            <div className='header'>
                <p className='status'>{props.title}</p>
                {
                    props.linkMe && (
                        <p className='view-all' onClick={() => {
                            dispatch({ type: 'SET_BREADCRUMBS', payload: props.breadcrumbs});
                            props.history.push('/shelf/recommendations')
                        }}>View all</p>
                    )
                }
            </div>
            <Swiper>
                <Carousel {...carouselProps}>
                    {
                        props.bookList &&
                        props.bookList.splice(0,12).map((book, index) => (
                            <BookCard key={index} book={book} source="recommendation" />
                        ))
                    }
                </Carousel>
            </Swiper>
        </div>
    )
}

export default ShelfSwipe;