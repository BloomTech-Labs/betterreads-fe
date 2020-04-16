import styled from 'styled-components';

const OnboardingQuizContainer = styled.div`

	width: 90%;
	margin: 0 auto;

	h1 {
		padding-top: 32px;
		margin-bottom: 8px;
		font-family: 'Frank Ruhl Libre', sans-serif;
		font-size: 2rem;
		font-weight: bold;
		color: #3b403d;
		line-height: 41px;
	}

	.select {
		margin-bottom: 24px;
		font-family: 'Open Sans', sans-serif;
		color: #4e4c4a;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.ant-checkbox-group {
			margin-bottom: 24px;

			.ant-checkbox-group-item {
				width: 50%;
				margin: 0 0 8px;

				span {
					font-family: 'Open Sans', sans-serif;
					font-size: 0.875rem;
					color: #4e4c4a;
				}
			}
		}

		button {
			padding: 10px 32px;
			background-color: #d24719;
			border: none;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			color: #ffffff;
		}
	}
`;

export default OnboardingQuizContainer;