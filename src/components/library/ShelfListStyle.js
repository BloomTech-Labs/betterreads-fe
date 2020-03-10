import styled from 'styled-components';

const ShelfListContainer = styled.div`
    .shelf-item-and-my-shelves-container {
        max-width: 1120px;
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .shelf-item-container {
            .shelf-items {
                display: flex;
                flex-direction: column;
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
    }

    @media (min-width: 1120px) {
		.shelf-item-and-my-shelves-container {
			flex-direction: row;
			justify-content: space-between;

            .shelf-item-container {
                width: 687px;

                .shelf-items {
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
            }

			.my-shelves {
                width: 216px;
				margin: 0;
                display: block;

                // h2 {
                //     margin-top: 0;
                // }
	
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
	}
`;

export default ShelfListContainer;