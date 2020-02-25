import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SignInContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;

	form {
		display: flex;
		flex-direction: column;
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
				props.history.push('/search');
			})
			.catch(error => console.log(error));
	};

	return (
		<SignInContainer>
			<h1>Sign in to BetterReads</h1>
			<h2>Sign in to get started</h2>

			<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
				<label htmlFor="emailAddress">Email Address</label>
				<input
					name="emailAddress"
					value={input.emailAddress}
					onChange={onChange}
					required
				/>

				<label htmlFor="password">Password</label>
				<input
					name="password"
					value={input.password}
					onChange={onChange}
					required
				/>
				{/* <p>Forgot password? Reset here.</p> */}

				<button type="submit">Sign in</button>
			</form>

			<p onClick={() => props.history.push('/signup')}>
				Need an account? Sign up here.
			</p>

			<p>OR</p>

			<a href="http://localhost:5000/api/auth/google">
				<button className="google-button">
					<i class="fab fa-google"></i>
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
