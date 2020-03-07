import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp, resetError } from '../../actions/index';
import SignUpContainer from './SignUpStyle';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';

const apiLocal = process.env.APIURL || 'http://localhost:5000/api';

const SignUp = props => {
	const [input, setInput] = useState({
		fullName: '',
		emailAddress: '',
		password: '',
		confirmPassword: ''
	});

	const onChange = event => {
		setInput({
			...input,
			[event.target.name]: event.target.value
		});
	};

	const onSubmit = event => {
		event.preventDefault();
		props.resetError();
		props.signUp(input, props.history);
	};

	return (
		<SignUpContainer>
			<div className="banner"></div>

			<div className="form-container">
				<form autoComplete="off" spellCheck="false" onSubmit={onSubmit}>
					<h1>
						Create an account to
						<br />
						join Readrr
					</h1>

					<p className="already">
						Already have an account?
						<b
							onClick={() => {
								props.resetError();
								props.history.push('/signin');
							}}
						>
							Sign in here.
						</b>
					</p>

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

					{props.error && <p className="error">{props.error}</p>}

					<button type="submit" className="sign-up">
						Sign up
					</button>

					<p className="or">OR</p>

					<a href=`${apiLocal}/auth/facebook`>
						<button type="button" className="facebook-button">
							<img src={facebooklogo} alt="facebook logo" />
							Sign up with Facebook
						</button>
					</a>

					<a href=`${apiLocal}/auth/google`>
						<button type="button" className="google-button">
							<img src={googlelogo} alt="google logo" />
							Sign up with Google
						</button>
					</a>

					<p className="policy">
						By signing up, I agree to Readrr' Terms of Service
						and Privacy Policy.
					</p>
				</form>
			</div>
		</SignUpContainer>
	);
};

const mapStateToProps = state => {
	return {
		error: state.authentication.error
	};
};

export default connect(mapStateToProps, { signUp, resetError })(SignUp);
