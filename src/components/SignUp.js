import React, { useState } from 'react';
import styled from 'styled-components';

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;

	form {
		display: flex;
		flex-direction: column;
	}
`;

const SignUp = props => {
	const [input, setInput] = useState({
		fullName: '',
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

			{/* <p>OR</p>

            <button>Sign up with Facebook</button>
            <button>Sign up with Google</button> */}
		</SignUpContainer>
	);
};

export default SignUp;
