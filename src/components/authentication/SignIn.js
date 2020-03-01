import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, resetError } from '../../actions/index';
import SignInContainer from './SignInStyle';
import { PageView, Event } from '../tracking/';

const SignIn = props => {
	const [input, setInput] = useState({
		emailAddress: '',
		password: ''
	});

	useEffect(() => {
		Event('Sign In', 'Sign in loaded', 'SIGN_IN');
		PageView();
	}, []);

	const onChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		props.setError();
		props.signIn(input, props.history);
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

				{<p className="error">{props.error}</p>}

				<button type="submit">Sign in</button>
			</form>

			<p className="need">
				Need an account?
				<b
					onClick={() => {
						props.resetError();
						props.history.push('/signup');
					}}
				>
					Sign up here.
				</b>
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

const mapStateToProps = state => {
	return {
		error: state.authentication.error
	};
};

export default connect(mapStateToProps, { signIn, resetError })(SignIn);
