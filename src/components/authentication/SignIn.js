import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, resetError } from '../../actions/index';
import SignInContainer from './SignInStyle';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';
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
		props.resetError();
		props.signIn(input, props.history);
	};

	return (
		<SignInContainer>
			<div className="banner"></div>

			<div className="form-container">
				<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
					<h1>Sign in to BetterReads</h1>
					<p className="already">
						Already have an account?
						<b
							onClick={() => {
								props.resetError();
								props.history.push('/signup');
							}}
						>
							Sign up here.
						</b>
					</p>

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

					{props.error && <p className="error">{props.error}</p>}

					<button type="submit" className="sign-in">
						Sign in
					</button>

					<p className="or">OR</p>

					<a href="http://localhost:5000/api/auth/facebook">
						<button type="button" className="facebook-button">
							<img src={facebooklogo} alt="facebook logo" />
							Sign in with Facebook
						</button>
					</a>

					<a href="http://localhost:5000/api/auth/google">
						<button type="button" className="google-button">
							<img src={googlelogo} alt="google logo" />
							Sign in with Google
						</button>
					</a>
				</form>
			</div>
		</SignInContainer>
	);
};

const mapStateToProps = state => {
	return {
		error: state.authentication.error
	};
};

export default connect(mapStateToProps, { signIn, resetError })(SignIn);
