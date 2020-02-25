import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SignInContainer = styled.div`
	display: flex;
	flex-direction: column;

	form {
		display: flex;
		flex-direction: column;
	}

	a {
		img {
			height: 48px;
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
				<img
					src="https://raw.githubusercontent.com/thechutrain/mern-passport/master/src/components/Login/google_signin_buttons/web/1x/btn_google_signin_light_normal_web.png"
					alt="sign in with google button"
				/>
			</a>
			<a href="http://localhost:5000/api/auth/facebook">
				<img
					src="https://pngimage.net/wp-content/uploads/2018/06/login-with-facebook-button-png-transparent-2.png"
					alt="sign in with facebook button"
				/>
			</a>
		</SignInContainer>
	);
};

export default SignIn;
