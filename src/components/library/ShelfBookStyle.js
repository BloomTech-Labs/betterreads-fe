import styled from 'styled-components';

const ShelfBookContainer = styled.div`
    .book {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 16px;
        display: flex;

        .thumbnail {
            img {
                width: 100px;
                border-radius: 4px;
            }
        }

        .information {
            padding: 12px;
            display: flex;
            flex-direction: column;

            .top {
                .title-and-author {
                    .title {
                        margin-bottom: 4px;
                        font-family: 'Open Sans', sans-serif;
                        font-size: 1rem;
                        font-weight: 600;
                        color: #4E4C4A;
                        line-height: 22px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;  
                        overflow: hidden;
                    }

                    .author {
                        margin-bottom: 4px;
                        font-family: 'Open Sans', sans-serif;
                        font-size: 0.875rem;
                        color: #4E4C4A;
                    }
                }
            }

            .bottom {

            }
        }
    }

    .description {
        width: 90%;
        margin: 0 auto;
        // once button is implemented
        // border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);

        .heading {
            margin-bottom: 4px;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 1.25rem;
            font-weight: bold;
            color: #4E4C4A;
        }

        .content {
            height: ${props => props.readMore ? 'auto' : '274px'};
            font-family: 'Open Sans', sans-serif;
            font-size: 0.875rem;
            color: #4E4C4A;
            overflow: ${props => props.readMore ? 'visible' : 'hidden'};
        }

        .read-more {
            margin-top: 8px;
            margin-bottom: ;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            color: #868585;
            cursor: pointer;
        }
    }

    .genre-big-container {
        background-color: #F3F6F5;

        .genre-small-container {
            width: 90%;
            margin: 0 auto;

            .heading {
                padding-top: 16px;
                margin-bottom: 8px;
                font-family: 'Frank Ruhl Libre', sans-serif;
                font-size: 1.25rem;
                font-weight: bold;
                color: #4E4C4A;
            }

            .genres {
                margin-bottom: 4px;
                display: flex;
                flex-wrap: wrap;

                .genre {
                    margin-right: 12px;
                    margin-bottom: 12px;
                    padding: 10px;
                    background-color: #547862;
                    border-radius: 4px;
                    font-family: 'Open Sans', sans-serif;
                    font-weight: 500;
                    font-size: 0.875rem;
                    color: #ffffff;
                }
            }
        }
    }
`;

export default ShelfBookContainer;