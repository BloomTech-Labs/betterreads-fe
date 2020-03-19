import styled from 'styled-components';

const BookCardContainer = styled.div`
    width: 90%;
    margin: ${props => props.source === 'search' ? '0 auto' : '8px auto'};
    display: flex;
    // justify-content: space-between;

    border-bottom: ${props => props.source === 'search' ? '1px solid #cecece' : ''};
    border: ${props => props.source === 'library' ? '1px solid #cecece' : ''};
    border-radius: ${props => props.source === 'library' ? '4px' : ''};

    padding: ${props => props.source === 'search' ? '16px 0' : ''};


    font-family: 'Open Sans', sans-serif;

    .betterReadsOrange {background: #D24719;}
    .betterReadsGreen{background-color: #547862;}

    .fs-13{font-size: 13px;}
    .fs-14{font-size: 14px;}
    .fs-16{font-size: 16px;}

    .fw-600{font-weight: 600;}
    .fw-bold{font-wieght: bold;} 

    .lh-20{line-height: 20px;}
    .lh-22{line-height: 22px;}



    .thumbContainer{
        .thumbnail{
            border-radius: 5px 0 0;
            height: 112px;
            width: 82px;
            background-image: url(${props => props.bgImage});
            background-size: cover;
        }
        .ant-btn {
            color: #F7F7F7;
            width: 82px;
            border: none;
            border-radius: 0 0 0 5px;
            font-size: 13px;
            font-weight: 600;
            line-height: 20px;
            padding: 0 3px;

            .anticon-down{
                margin-left: 2px;
            }

            svg {
                margin-right: 4px;
            }
        }
    }

    .book{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        padding: 12px 8px;

        .bookDetail{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .titleAuthor {

                .title {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                    cursor: pointer;
                }

                .author {
                    cursor: pointer;
                }
            }

            .bookFav{
                .anticon-heart svg{
                    height: 26px;
                    width: 29px;
                    color: #D24719;
                }
            }
        }

        .calendars {
            display: flex;

            .input{
                display: flex;
                flex-direction: column;
                min-width: 50%;
                max-width: 100px;
                // width: 50%;

                .dateLabel {
                    margin-bottom: 0;
                    font-family: Open Sans;
                    font-weight: bold;
                    font-size: 0.625rem;
                }
            }

            .input:first-child {
                border-right: 1px solid #bfbfbf;
            }

            .input:last-child {
                padding-right: 0;
                padding-left: 8px;
            }

            .ant-calendar-picker-input {
                height: 16px;
                padding: 0;
                background-color: #fff;
                border: none;
            }
        }
        
    }

    @media (min-width: 1120px) {
        width: ${props => props.conWidth} || '336px';
        // margin: 8px 0 8px 0;

        .and-calendar-picker-input{
            
        }
    }
`;

export default BookCardContainer;