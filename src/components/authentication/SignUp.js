import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	margin-top: 64px;
	margin-bottom: 64px;
	display: flex;
	flex-direction: column;

	h1 {
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
			font-family: 'Nunito', sans-serif;
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
			font-family: 'Nunito', sans-serif;
			font-size: 1rem;
		}
	}

	.already {
		margin-bottom: 16px;
		font-size: 0.875rem;
		text-align: center;
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
				font-family: 'Nunito', sans-serif;
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
				font-family: 'Nunito', sans-serif;
				font-size: 1rem;
				color: white;
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
	const [error, setError] = useState('');

	const onChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		if (input.password !== input.confirmPassword) {
			setError('Passwords do not match');
		} else {
			axios
				.post(
					'http://localhost:5000/api/auth/signup',
					{
						fullName: input.fullName,
						emailAddress: input.emailAddress,
						username: input.username,
						password: input.password
					},
					{
						withCredentials: true
					}
				)
				.then(response => {
					console.log(response);
					localStorage.setItem('user_id', response.data.user.id);
					props.history.push('/library');
				})
				.catch(error => {
					console.log(error);
					setError('Email address already in use or username taken');
				});
		}
	};

	return (
		<SignUpContainer>
			<h1>Create an account to join BetterReads</h1>

			<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
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

				{error && <p className="error">{error}</p>}

				<button type="submit">Create account</button>
			</form>

			<p
				className="already"
				onClick={() => props.history.push('/signin')}
			>
				Already have an account? Sign in here.
			</p>

			<p className="or">OR</p>

			<a href="http://localhost:5000/api/auth/google">
				<button className="google-button">
					<i className="fab fa-google"></i>
					<p>Sign up with Google</p>
				</button>
			</a>

			<a href="http://localhost:5000/api/auth/facebook">
				<button className="facebook-button">
					<i className="fab fa-facebook-f"></i>
					<p>Sign up with Facebook</p>
				</button>
			</a>
		</SignUpContainer>
	);
};

export default SignUp;
