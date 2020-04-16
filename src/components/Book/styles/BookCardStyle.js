import styled from 'styled-components';

const BookCardContainer = styled.div`
    height: ${props => props.source === 'library' ? '148px' : ''};
    margin-top: ${props => props.source === 'library' ? '' : '4px'};
    margin-bottom: ${props => props.source === 'library' ? '16px' : ''};
    padding: ${props => props.source === 'search' ? '12px 0' : ''};
    border: ${props => props.source === 'library' ? '1px solid #d9d9d9' : ''};
    border-bottom: ${props => props.source === 'library' || props.source === 'recommendation' ? '' : '1px solid #d9d9d9'};
    border-radius: ${props => props.source === 'library' ? '4px' : ''};
    display: flex;

    .thumbnail-container {
        width: 88px;
        border: ${props => props.source === 'library' ? '' : '1px solid #d9d9d9'};
        border-radius: ${props => props.source === 'library' ? '' : '4px'};
        display: flex;
        flex-direction: column;

        .thumbnail {
            height: ${props => props.source === 'library' ? '118px' : '98px'};
            width: 86px;
            background-image: url(${props => props.thumbnail});
            background-size: cover;
            border-radius: ${props => props.source === 'library' ? '4px 0 0 0' : '4px 4px 0 0'};
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .ant-btn {
            height: 30px;
            width: 86px;
            padding: 0;
            border: none;
            border-radius: ${props => props.source === 'library' ? '0 0 0 4px' : '0 0 4px 4px'};
            font-family: 'Open Sans', sans-serif;
            font-size: 0.8125rem;
            font-weight: 600;
            color: #ffffff;

            .anticon-down {
                margin-left: 0;
            }
        }
    }

    .information {
        height: ${props => props.source === 'library' ? '148px' : '128px'};
        width: 100%;
        padding: 12px;
        display: ${props => props.source === 'recommendation' ? 'none' : 'flex'};
        flex-direction: column;
        justify-content: space-between;

        .title-author-and-favorite {
            display: flex;
            justify-content: space-between;

            .title-and-author {
                .title {
                    margin-bottom: 4px;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #4e4c4a;
                    line-height: 22px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                    cursor: pointer;
                }

                .author {
                    margin-bottom: 0;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 0.875rem;
                    color: #4e4c4a;
                    cursor: pointer;
                }
            }

            .favorite {
                .anticon-heart svg {
                    height: 26px;
                    width: 29px;
                    margin-left: 12px;
                    color: #d24719;
                }
            }
        }

        .calendars {
            display: flex;

            .calendar {
                width: 50%;
                display: flex;
                flex-direction: column;

                p {
                    margin-bottom: 0;
                    font-family: 'Open Sans', sans-serif;
                    font-weight: bold;
                    font-size: 0.625rem;
                    color: #868585;
                }

                .ant-calendar-picker-input {
                    height: 16px;
                    padding: 0;
                    background: none;
                    border: none;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 0.9rem;
                    color: #666;
                }
            }
        }
    }

    .orange {
        background-color: #d24719;
    }

    .green {
        background-color: #547862;
    }

    @media(min-width: 1120px) {
        width: ${props => props.conWidth || '335px'};
    }
`;

export default BookCardContainer;