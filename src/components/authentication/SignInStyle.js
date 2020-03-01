import styled from 'styled-components';

const SignInContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 64px;
	margin-bottom: 64px;
	display: flex;
	flex-direction: column;

	h2 {
		margin-bottom: 32px;
	}

	form {
		display: flex;
		flex-direction: column;

		label {
			font-size: 1rem;
		}

		input {
			margin-bottom: 16px;
			padding: 12px;
			border: 1px solid gray;
			border-radius: 3px;
			font-family: 'SF-Pro-Display', sans-serif;
			font-size: 1rem;
		}

		.error {
			margin-top: -8px;
			font-size: 0.875rem;
			color: red;
		}

		button {
			margin-top: 16px;
			margin-bottom: 8px;
			padding: 12px;
			border: none;
			border-radius: 3px;
			font-family: 'SF-Pro-Display', sans-serif;
			font-size: 1rem;
		}
	}

	.need {
		margin-bottom: 16px;
		font-size: 0.875rem;
		text-align: center;

		b {
			margin-left: 4px;
		}
	}

	.or {
		margin-bottom: 16px;
		font-size: 1rem;
		text-align: center;
	}

	a {
		text-decoration: none;

		.google-button {
			width: 100%;
			padding: 12px;
			margin-bottom: 16px;
			background-color: #db4437;
			border: none;
			border-radius: 3px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			i {
				margin-right: 16px;
				font-size: 24px;
				color: white;
			}

			p {
				font-family: 'SF-Pro-Display', sans-serif;
				font-size: 1rem;
				color: white;
			}
		}

		.facebook-button {
			width: 100%;
			padding: 12px;
			background-color: #3b5998;
			border: none;
			border-radius: 3px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			i {
				margin-right: 16px;
				font-size: 24px;
				color: white;
			}

			p {
				font-family: 'SF-Pro-Display', sans-serif;
				font-size: 1rem;
				color: white;
			}
		}
	}
`;

export default SignInContainer;
