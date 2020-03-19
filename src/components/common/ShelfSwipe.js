import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BookCard from './BookCard';
import { Carousel } from 'antd';
import styled from 'styled-components'
import { useEffect } from 'react';

const Wrapper = styled.div`
    .ant-carousel{
        width: 100% !important;
        
        .slick-dots li button {
            background-color: #D24719 !important;
        }
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
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    }

    return (
        <Wrapper>
            <div className="reading-status">
                <div className='header'>
                    <p className='status'>Recommendations</p>
                    <p className='view-all' onClick={() => {
                        dispatch({ type: 'SET_BREADCRUMBS', payload: props.breadcrumbs});
                        props.history.push('/shelf/recommendations')
                    }}>View all</p>
                </div>
                <Carousel {...carouselProps}>
                    {
                        props.bookList &&
                        props.bookList.splice(0,12).map((book, index) => (
                            <BookCard key={index} book={book} source="recommendation" />
                        ))
                    }
                </Carousel>
            </div>
            
        </Wrapper>
    )
}

export default ShelfSwipe;