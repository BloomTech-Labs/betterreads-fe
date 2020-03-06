import styled from 'styled-components';

const LibraryContainer = styled.div`
	.what-are-you-reading-container {
		background-color: #f3f6f5;

		.what-are-you-reading {
			max-width: 1120px;
			width: 90%;
			margin: 0 auto;

			h2 {
				margin-bottom: 0;
				padding-top: 32px;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 2rem;
				font-weight: bold;
				color: #3b403d;
			}

			p {
				margin-bottom: 0;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4e4c4a;
			}
		}
	}

	.reading-status-and-my-shelves-container {
		display: flex;
		flex-direction: column;

		.reading-status-container {
			background-color: #f3f6f5;

			.reading-status {
				max-width: 1120px;
				width: 90%;
				margin: 0 auto;

				p {
					margin-bottom: 0;
					padding: 16px 0;
					border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
					font-family: 'Frank Ruhl Libre', sans-serif;
					font-size: 1.25rem;
					font-weight: bold;
					color: #4e4c4a;
				}

				p:last-child {
					border-bottom: none;
				}
			}
		}

		.my-shelves {
			max-width: 1120px;
			width: 90%;
			margin: 0 auto;

			h2 {
				margin-top: 24px;
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
			flex-direction: row;
			justify-content: space-between;

			.my-shelves {
				width: 216px;
				margin: 0;

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

			.reading-status-container {
				background-color: #ffffff;

				.reading-status {
					width: 687px;
					margin: 0;
				}
			}
		}
	}
`;

export default LibraryContainer;
