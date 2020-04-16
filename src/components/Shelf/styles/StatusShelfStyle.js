import styled from "styled-components";

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

export default ShelfSwipeContainer;