import styled from 'styled-components';

const ShelfBookContainer = styled.div`
    .book-details {
        width: 90%;
        margin: 0 auto;
        
        .sc-AxiKw {
            width: 100%;
        }

        .description {
            border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);

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
            .genre-small-container {
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

    @media (min-width: 1120px) {
        width: 1120px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .book-details {
            width: 687px;
            margin: 0;

            .description {
                .content {
                    height: auto;
                }

                .read-more {
                    display: none;
                }
            }
        }
    }
`;

export default ShelfBookContainer;