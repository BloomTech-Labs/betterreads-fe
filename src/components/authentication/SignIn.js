import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
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

	.need {
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

const SignIn = props => {
	const [input, setInput] = useState({
		emailAddress: '',
		password: ''
	});
	const [error, setError] = useState('');

	useEffect(() => {
		ReactGA.event({ category: 'Sign In', action: 'Sign in loaded' });
		ReactGA.pageview(window.location.pathname + window.location.search);
	}, []);

	const onChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		axios
			.post('http://localhost:5000/api/auth/signin', input, {
				withCredentials: true
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('user_id', response.data.user.id);
				props.history.push('/library');
			})
			.catch(error => {
				console.log(error);
				setError('Invalid credentials');
			});
	};

	return (
		<SignInContainer>
			<h1>Sign in to BetterReads</h1>
			<h2>Sign in to get started</h2>

			<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
				<label htmlFor="emailAddress">Email Address</label>
				<input
					type="email"
					placeholder="Enter your email"
					name="emailAddress"
					value={input.emailAddress}
					onChange={onChange}
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					name="password"
					value={input.password}
					onChange={onChange}
					required
					minLength="5"
				/>

				{error && <p className="error">{error}</p>}

				<button type="submit">Sign in</button>
			</form>

			<p className="need" onClick={() => props.history.push('/signup')}>
				Need an account? Sign up here.
			</p>

			<p className="or">OR</p>

			<a href="http://localhost:5000/api/auth/google">
				<button className="google-button">
					<i className="fab fa-google"></i>
					<p>Sign in with Google</p>
				</button>
			</a>

			<a href="http://localhost:5000/api/auth/facebook">
				<button className="facebook-button">
					<i className="fab fa-facebook-f"></i>
					<p>Sign in with Facebook</p>
				</button>
			</a>
		</SignInContainer>
	);
};

export default SignIn;
