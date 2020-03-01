import styled from 'styled-components';
import mobilesignupbanner from '../../img/mobile-sign-up-banner.jpg';
import desktopsignupbanner from '../../img/desktop-sign-up-banner.jpg';

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;

	.banner {
		height: 75px;
		margin-bottom: 4px;
		background: url(${mobilesignupbanner});
		background-size: cover;
		background-position: center;
	}

	.form-container {
		form {
			max-width: 335px;
			width: 90%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;

			h1 {
				margin-bottom: 4px;
				font-family: 'Frank Ruhl Libre', sans-serif;
				font-weight: bold;
				font-size: 2rem;
				color: #547862;
				line-height: 40px;
				white-space: nowrap;
			}

			.already {
				margin-bottom: 28px;
				font-family: 'Open Sans', sans-serif;
				font-size: 0.875rem;
				color: #868585;
				line-height: 18px;

				b {
					margin-left: 4px;
					cursor: pointer;
				}
			}

			label {
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4e4c4a;
				line-height: 22px;
			}

			input {
				margin-bottom: 16px;
				padding: 8px 12px;
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4e4c4a;
				line-height: 22px;

				::placeholder {
					color: #bfbfbf;
				}
			}

			.error {
				margin-bottom: 0;
				font-family: 'Open Sans', sans-serif;
				font-size: 0.875rem;
				color: red;
				line-height: 0;
			}

			.create-account {
				margin-top: 16px;
				margin-bottom: 16px;
				padding: 8px 12px;
				background-color: #d24719;
				border: none;
				border-radius: 4px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #ffffff;
				line-height: 22px;
				cursor: pointer;
			}

			.or {
				margin-bottom: 16px;
				font-family: 'Open Sans', sans-serif;
				font-size: 0.875rem;
				font-weight: 600;
				color: #868585;
				line-height: 20px;
				text-align: center;
			}

			a {
				text-decoration: none;

				.facebook-button {
					width: 100%;
					margin-bottom: 8px;
					padding: 8px 12px;
					background-color: #ffffff;
					border: 1px solid #bfbfbf;
					border-radius: 4px;
					font-family: 'Open Sans', sans-serif;
					font-size: 1rem;
					color: #4267b2;
					line-height: 22px;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					img {
						margin-right: 8px;
					}
				}

				.google-button {
					width: 100%;
					margin-bottom: 8px;
					padding: 8px 12px;
					background-color: #ffffff;
					border: 1px solid #bfbfbf;
					border-radius: 4px;
					font-family: 'Open Sans', sans-serif;
					font-size: 1rem;
					font-weight: normal;
					color: rgba(0, 0, 0, 0.54);
					line-height: 22px;
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;

					img {
						margin-right: 8px;
					}
				}
			}

			.policy {
				width: 70%;
				margin: 0 auto;
				margin-bottom: 16px;
				font-family: 'Open Sans', sans-serif;
				font-size: 0.625rem;
				color: #868585;
				line-height: 15px;
				text-align: center;
			}
		}
	}

	@media (min-width: 375px) {
		.form-container {
			form {
				.policy {
					width: 60%;
				}
			}
		}
	}

	@media (min-width: 1120px) {
		flex-direction: row-reverse;

		.banner {
			height: 100vh;
			width: 50%;
			margin-bottom: 0px;
			background: url(${desktopsignupbanner});
			background-size: cover;
			background-position: center;
		}

		.form-container {
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			h1 {
				font-size: 42px;
				line-height: 46px;
			}

			form {
				h1 {
					margin-bottom: 16px;
					font-size: 2.625rem;
					line-height: 46px;
				}

				.already {
					margin-bottom: 36px;
					font-size: 1.125rem;
					line-height: 28px;
				}

				input {
					margin-bottom: 24px;
				}

				.error {
					margin-top: -2px;
				}

				.create-account {
					margin-top: 20px;
					margin-bottom: 24px;
				}
				a {
					.facebook-button {
						margin-bottom: 16px;
					}

					.google-button {
						margin-bottom: 16px;
					}
				}

				.policy {
					width: 100%;
					margin: 0;
					font-size: 0.6875rem;
					line-height: 15px;
					text-align: left;
				}
			}
		}
	}
`;

export default SignUpContainer;
