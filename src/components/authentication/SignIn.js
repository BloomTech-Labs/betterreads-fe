//Import React
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// Ant Design
import { Modal, Button, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
//Import Actions
import {
  signIn,
  resetError,
  forgotPassword,
} from '../../store/actions/authenticationActions';
import useDocumentTitle from '../../utils/hooks/useDocumentTitle';
//Styling
import SignInContainer from './styles/SignInStyle';
import facebooklogo from '../../img/facebook-logo.svg';
import googlelogo from '../../img/google-logo.svg';
//Utils
import { PageView, Event } from '../../utils/tracking';
import history from '../../utils/history';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.readrr.app';

const SignIn = (props) => {
  useDocumentTitle('Readrr - A platform for readers');

  const [input, setInput] = useState({
    emailAddress: '',
    password: '',
  });

  useEffect(() => {
    Event('Sign In', 'Sign in loaded', 'SIGN_IN');
    PageView();
  }, []);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.resetError();
    props.signIn(input, history);
    Event('SIGN IN', 'User signed in', 'SIGN_IN');
  };

  const success = () => {
    message.success('Sucessfully sent reset email!');
  };

  const error = () => {
    message.error('Error sending reset email');
  };

  const { confirm } = Modal;
  let email = '';

  const info = () => {
    let title = 'Enter your email address';
    confirm({
      title: title,
      content: (
        <div>
          <Input
            placeholder='example@readrr.com'
            prefix={<UserOutlined />}
            onChange={(e) => {
              email = e.target.value;
            }}
          />
        </div>
      ),
      onOk() {
        return new Promise((resolve, _reject) => {
          title = 'Sending email';
          props.forgotPassword({ email: email });
          setTimeout(resolve, 700);
          if (props.resetPasswordError === false) {
            error();
          } else {
            success();
          }
        });
      },
      onCancel() {},
    });
  };

  return (
    <SignInContainer>
      <div className='banner'></div>

      <div className='form-container'>
        <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
          <h1 data-testid='sign-in-heading'>Sign in to Readrr</h1>
          <p className='already'>
            Don't have an account?
            <b
              onClick={() => {
                props.resetError();
                history.push('/signup');
              }}
              data-testid='sign-up-redirect'
            >
              Sign up here.
            </b>
          </p>

          <label htmlFor='emailAddress'>Email Address</label>
          <input
            type='email'
            placeholder='Enter your email'
            name='emailAddress'
            value={input.emailAddress}
            onChange={onChange}
            required
            data-testid='email-input'
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            value={input.password}
            onChange={onChange}
            required
            minLength='5'
            data-testid='password-input'
          />

          {props.error && (
            <p className='error' data-testid='error'>
              {props.error}
            </p>
          )}

          <a href='#' className='forgot' onClick={() => info()}>
            Forgot Password?
          </a>

          <button
            type='submit'
            className='sign-in'
            data-testid='sign-in-button'
          >
            Sign in
          </button>

          <p className='or'>OR</p>

          <a href={`${API_URL}/api/auth/facebook`}>
            <button type='button' className='facebook-button'>
              <img src={facebooklogo} alt='facebook logo' />
              Sign in with Facebook
            </button>
          </a>

          <a href={`${API_URL}/api/auth/google`}>
            <button type='button' className='google-button'>
              <img src={googlelogo} alt='google logo' />
              Sign in with Google
            </button>
          </a>
        </form>
      </div>
    </SignInContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.authentication.error,
    resetPasswordError: state.authentication.resetError,
    resetMessage: state.authentication.resetMessage,
  };
};

export default connect(mapStateToProps, { signIn, resetError, forgotPassword })(
  SignIn
);
