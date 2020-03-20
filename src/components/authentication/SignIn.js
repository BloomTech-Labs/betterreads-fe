import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, resetError } from '../../actions/authenticationActions';
import useDocumentTitle from '../hooks/useDocumentTitle';
import SignInContainer from './styles/SignInStyle';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';
import { PageView, Event } from '../tracking';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

const SignIn = props => {
	useDocumentTitle('Readrr - A platform for readers');

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
					<h1>Sign in to Readrr</h1>
					<p className="already">
						Don't have an account?
						<b
							onClick={() => {
								props.resetError();
								props.history.push('/signup');
							}}
							data-testid='sign-up-redirect'
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
						data-testid='email-address-input'
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
						data-testid='password-input'
					/>

					{props.error && <p className="error" data-testid='error'>{props.error}</p>}

					<button type="submit" className="sign-in" data-testid='sign-in-button'>
						Sign in
					</button>

					<p className="or">OR</p>

					<a href={`${API_URL}/api/auth/facebook`}>
						<button type="button" className="facebook-button">
							<img src={facebooklogo} alt="facebook logo" />
							Sign in with Facebook
						</button>
					</a>

					<a href={`${API_URL}/api/auth/google`}>
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
