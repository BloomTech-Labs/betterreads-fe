import React from 'react';
import { connect } from 'react-redux';
import { setBreadcrumbs} from '../../actions/bookActions';
import BookCard from './BookCard';
import BookCardList from './BookCardList';
import { Carousel } from 'antd';
import styled from 'styled-components'

const Swiper = styled.div`
    padding-bottom: 16px;
    
    .ant-carousel{
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
    }

    return (
        <div className="reading-status">
            <div className='header'>
                {
                    props.title !== 'Recommendations' ? <p className='status'>{props.title}  ({props.bookList.length})</p> : <p className='status'>{props.title}</p>


                }
                
                {
                    props.link && (
                        <p className='view-all' onClick={() => {
                            props.setBreadcrumbs(props.breadcrumbs);
                            props.history.push(props.link)
                        }}>View all</p>
                    )
                }
            </div>
            {
                props.display === 'carousel' &&
                <Swiper>
                    <Carousel {...carouselProps}>
                        {
                            props.bookList &&
                            props.bookList.splice(0,10).map((book, index) => (
                                <BookCard key={index} book={book} source="recommendation" history={props.history} />
                            ))
                        }
                    </Carousel>
                </Swiper>
            }
            {
                props.display === 'card' &&
                <BookCardList history={props.history} books={props.bookList} source={'library'} />
            }
        </div>
    )
}

export default connect(null, { setBreadcrumbs })(ShelfSwipe);