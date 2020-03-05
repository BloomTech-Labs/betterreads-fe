import styled from 'styled-components';

const LibraryContainer = styled.div`
	.what-are-you-reading {
		background-color: #f3f6f5;

		.what-are-you-reading-container {
			max-width: 1120px;
			width: 90%;
			margin: 0 auto;

			h2 {
				margin-bottom: 0;
				padding-top: 24px;
				padding-bottom: 8px;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 2rem;
				font-weight: bold;
				color: #3b403d;
				line-height: 40px;
			}

			p {
				margin-bottom: 8px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4e4c4a;
				line-height: 22px;
			}
		}
	}

	.reading-status {
		background-color: #f3f6f5;

		.reading-status-container {
			max-width: 1120px;
			width: 90%;
			margin: 0 auto;
			padding-bottom: 12px;

			p {
				margin-bottom: 0;
				padding: 12px 0;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-size: 1.25rem;
				font-weight: bold;
				color: #4e4c4a;
				border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
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
			margin-bottom: 4px;
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-size: 1.5rem;
			font-weight: bold;
			color: #547862;
			line-height: 30px;
		}

		.create-shelves {
			margin-bottom: 8px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: #5c5a57;
			line-height: 22px;
		}

		.create-new-shelf-button {
			width: 100%;
			margin-bottom: 16px;
			padding: 8px 12px;
			background-color: #ffffff;
			border: 1px solid #d24719;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			font-weight: 600;
			color: #d24719;
			line-height: 22px;
			cursor: pointer;
		}

		.shelves-container {
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
					padding: 8px;
					border-bottom: 1px solid #d9d9d9;
					font-family: 'Open Sans', sans-serif;
					font-size: 1.125rem;
					font-weight: 600;
					color: #4e4c4a;
					line-height: 18px;
				}

				svg {
					margin: 0 auto;
				}

				.shelf-quantity {
					margin-bottom: 0;
					padding: 8px;
					font-family: 'Open Sans', sans-serif;
					font-size: 1.125rem;
					font-weight: bold;
					color: #4e4c4a;
					line-height: 22px;
				}
			}
		}
	}
`;

export default LibraryContainer;
