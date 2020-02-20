import React, { useState } from 'react';
import styled from 'styled-components';

const SignInContainer = styled.div`
	display: flex;
	flex-direction: column;

	form {
		display: flex;
		flex-direction: column;
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
				<p>Forgot password? Reset here.</p>

				<button type="submit">Sign in</button>
			</form>

			<p onClick={() => props.history.push('/signup')}>
				Need an account? Sign up here.
			</p>

			{/* <p>OR</p>

            <button>Sign in with Facebook</button>
            <button>Sign in with Google</button> */}
		</SignInContainer>
	);
};

export default SignIn;
