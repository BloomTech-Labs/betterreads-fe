import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
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

const SignUp = props => {
	const [input, setInput] = useState({
		fullName: '',
		emailAddress: '',
		username: '',
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
			.post('http://localhost:5000/api/auth/signup', input, {
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
		<SignUpContainer>
			<h1>Create an account to join BetterReads</h1>

			<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
				<label htmlFor="fullName">Full Name</label>
				<input
					name="fullName"
					value={input.fullName}
					onChange={onChange}
					required
				/>

				<label htmlFor="emailAddress">Email Address</label>
				<input
					name="emailAddress"
					value={input.emailAddress}
					onChange={onChange}
					required
				/>

				<label htmlFor="username">Username</label>
				<input
					name="username"
					value={input.username}
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

				<button type="submit">Create account</button>
			</form>

			<p onClick={() => props.history.push('/signin')}>
				Already have an account? Sign in here.
			</p>

			<p>OR</p>

			<a href="http://localhost:5000/api/auth/google">
				<button className="google-button">
					<i class="fab fa-google"></i>
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
