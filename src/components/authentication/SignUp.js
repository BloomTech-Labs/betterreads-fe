import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/index';
import styled from 'styled-components';
import signupbanner from '../../img/sign-up-banner.svg';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';

const SignUpContainer = styled.div`
	margin-bottom: 64px;
	display: flex;
	flex-direction: column;

	.banner {
		height: 25vh;
		background: url(${signupbanner});
		background-size: cover;
		background-position: center;
	}

	form {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		h1 {
			margin-top: 14px;
			margin-bottom: 8px;
			font-family: 'Frank Ruhl Libre', sans-serif;
			font-weight: bold;
			font-size: 2rem;
			color: #547862;
			line-height: 40px;
		}

		.already {
			margin-bottom: 32px;
			font-family: 'Open Sans', sans-serif;
			font-size: 0.875rem;
			color: #868585;

			b {
				cursor: pointer;
			}
		}

		label {
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: #5c5a57;
		}

		input {
			margin-bottom: 16px;
			padding: 12px;
			border: 1px solid #d9d9d9;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: #5c5a57;

			::placeholder {
				color: #bfbfbf;
			}
		}

		.error {
			margin-top: -12px;
			font-family: 'Open Sans', sans-serif;
			font-size: 0.875rem;
			color: red;
		}

		.create-account {
			margin-top: 16px;
			margin-bottom: 32px;
			padding: 12px;
			background-color: #d24719;
			border: none;
			border-radius: 4px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			color: white;
		}

		.or {
			margin-bottom: 32px;
			font-family: 'Open Sans', sans-serif;
			font-size: 1rem;
			font-weight: 600;
			color: #868585;
			text-align: center;
		}

		a {
			text-decoration: none;

			.facebook-button {
				width: 100%;
				margin-bottom: 16px;
				padding: 12px;
				background-color: #ffffff;
				border: 1px solid #bfbfbf;
				border-radius: 4px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				color: #4267b2;
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
				margin-bottom: 16px;
				padding: 12px;
				background-color: #ffffff;
				border: 1px solid #bfbfbf;
				border-radius: 4px;
				font-family: 'Open Sans', sans-serif;
				font-size: 1rem;
				font-weight: normal;
				color: rgba(0, 0, 0, 0.54);
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;

				img {
					margin-right: 8px;
				}
			}
		}
	}
`;

const SignUp = props => {
	const [input, setInput] = useState({
		fullName: '',
		emailAddress: '',
		username: '',
		password: '',
		confirmPassword: ''
	});

	const onChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		props.signUp(input, props.history);
	};

	return (
		<SignUpContainer>
			<div className="banner"></div>

			<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
				<h1>Create an account to join BetterReads</h1>

				<p className="already">
					Already have an account?{' '}
					<b onClick={() => props.history.push('/signin')}>
						Sign in here.
					</b>
				</p>

				<label htmlFor="fullName">Full Name</label>
				<input
					type="text"
					placeholder="Enter your name"
					name="fullName"
					value={input.fullName}
					onChange={onChange}
					required
				/>

				<label htmlFor="emailAddress">Email Address</label>
				<input
					type="email"
					placeholder="Enter your email"
					name="emailAddress"
					value={input.emailAddress}
					onChange={onChange}
					required
				/>

				<label htmlFor="username">Username</label>
				<input
					type="text"
					placeholder="Enter a username"
					name="username"
					value={input.username}
					onChange={onChange}
					required
					minLength="5"
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Enter a password"
					name="password"
					value={input.password}
					onChange={onChange}
					required
					minLength="5"
				/>

				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					placeholder="Reenter your password"
					name="confirmPassword"
					value={input.confirmPassword}
					onChange={onChange}
					required
					minLength="5"
				/>

				{<p className="error">{props.error}</p>}

				<button type="submit" className="create-account">
					Create account
				</button>

				<p className="or">OR</p>

				<a href="http://localhost:5000/api/auth/facebook">
					<button type="button" className="facebook-button">
						<img src={facebooklogo} alt="facebook logo" />
						Sign up with Facebook
					</button>
				</a>

				<a href="http://localhost:5000/api/auth/google">
					<button type="button" className="google-button">
						<img src={googlelogo} alt="google logo" />
						Sign up with Google
					</button>
				</a>
			</form>
		</SignUpContainer>
	);
};

const mapStateToProps = state => {
	return {
		error: state.authentication.error
	};
};

export default connect(mapStateToProps, { signUp })(SignUp);
