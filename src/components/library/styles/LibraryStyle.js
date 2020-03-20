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
				line-height: 40px;
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
		max-width: 1120px;

		.reading-status-container {
			background-color: #f3f6f5;

			.reading-status {
				padding-top: 12px;
				border-bottom: 1.5px solid rgba(217, 217, 217, 0.5);
				display: flex;
				flex-direction: column;

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
			}

			.reading-status:last-child {
				border-bottom: none;
			}
		}
	}

	@media (min-width: 1120px) {
		.reading-status-and-my-shelves-container {
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.reading-status-container {
				width: 687px;
				background-color: #ffffff;

				.reading-status {
					.header {
						width: 100%;
						margin-right: 0;
						margin-left: 0;
					}
				}
			}
		}
	}
`;

export default LibraryContainer;
