import styled from 'styled-components';

const ShelfBookContainer = styled.div`
    .book-details {
        .description {
            width: 90%;
            margin: 0 auto;
            // once button is implemented
            // border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);

            .heading {
                margin-top: 8px;
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
    }

    .my-shelves {
        max-width: 1120px;
        width: 90%;
        margin: 0 auto;
        display: none;

        h2 {
            margin-top: 16px;
            margin-bottom: 0;
            font-family: 'Frank Ruhl Libre', sans-serif;
            font-size: 1.5rem;
            font-weight: bold;
            color: #547862;
        }

        .create-shelves {
            margin-bottom: 16px;
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            color: #5c5a57;
        }

        .create-new-shelf-button {
            width: 100%;
            margin-bottom: 16px;
            padding: 8px 0;
            background-color: #ffffff;
            border: 1px solid #d24719;
            border-radius: 4px;
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            color: #d24719;
            cursor: pointer;
            transition: 0.25s;

            :hover {
                background-color: #d24719;
                color: #ffffff;
            }
        }

        .shelves-container {
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .shelf {
                height: 42.75vw;
                width: 47.5%;
                margin-bottom: 4.5vw;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                cursor: pointer;

                .shelf-name {
                    margin-bottom: 0;
                    padding: 10px;
                    border-bottom: 1px solid #d9d9d9;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #4e4c4a;
                }

                svg {
                    margin: 0 auto;
                }

                .shelf-quantity {
                    margin-bottom: 0;
                    padding: 10px;
                    font-family: 'Open Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #4e4c4a;
                }
            }
        }
    }

    @media (min-width: 1120px) {
        width: 1120px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .book-details {
            width: 687px;

            & > div:first-child {
                width: 100%;
                margin: 0;
            }

            .description {
                width: 100%;
                margin: 0;

                .content {
                    height: auto;
                }
            }

            .genre-big-container {
                background-color: #ffffff;

                .genre-small-container {
                    width: 100%;
                    margin: 0;
                }
            }
        }

        .my-shelves {
            width: 216px;
            margin: 0;
            display: block;

            .create-new-shelf-button {
                width: 162px;
            }

            .shelves-container {
                flex-direction: column;
                justify-content: flex-start;
                flex-wrap: nowrap;

                .shelf {
                    height: 162px;
                    width: 162px;
                    margin-bottom: 16px;
                }
            }
        }
    }
`;

export default ShelfBookContainer;