import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/index';
import SignUpContainer from './SignUpStyle';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';

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
						join BetterReads
					</h1>

					<p className="already">
						Already have an account?
						<b onClick={() => props.history.push('/signin')}>
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

					<button type="submit" className="create-account">
						Sign up
					</button>

					<p className="or">OR</p>

					<a href="http://localhost:5000/api/auth/facebook">
						<button type="button" className="facebook-button">
							<img src={facebooklogo} alt="facebook logo" />
							Sign up with Facebook
						</button>
					</a>

					<a href="http://localhost:5000/api/auth/google">
						<button type="button" className="google-button">
							<img src={googlelogo} alt="google logo" />
							Sign up with Google
						</button>
					</a>

					<p className="policy">
						By signing up, I agree to BetterReads' Terms of Service
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

export default connect(mapStateToProps, { signUp })(SignUp);
