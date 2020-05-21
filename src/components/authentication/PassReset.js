import React from 'react';
//ant design
import { message } from 'antd';
//styled components
import SignInContainer from './styles/SignInStyle';

// Redux
import { connect } from 'react-redux';
// Actions
import { forgotPassword, changePassword } from '../../store/actions';
// Utils
import history from '../../utils/history';

const PassReset = (props) => {
  const token = window.location.search.split('?token=')[1];
  console.log(token);

  const [input, setInput] = React.useState({
    password1: '',
    password2: '',
  });

  React.useEffect(() => {
    console.log('Hook Token', token);
    localStorage.setItem('rsTkn', token);
  }, [token]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const success = () => {
    message.success('Sucessfully reset password!');
  };

  const error = () => {
    message.error('Error resetting password!');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let tkn = token ? token : localStorage.getItem('rsTkn');
    if (checkPassword([input.password1, input.password2])) {
      console.log('Passwords Match');
      return new Promise((resolve, _reject) => {
        props.changePassword(token, input.password1);
        setTimeout(resolve, 700);
        if (props.resetPasswordError === false) {
          success();
        } else {
          error();
        }
      });
    } else {
      console.log('Passwords Invalid');
    }
  };

  const checkPassword = (passwords) => {
    if (!passwords) return false;
    if (passwords[0] !== passwords[1]) return false;
    return true;
  };

  if (token) {
    return (
      <SignInContainer>
        <div className='banner'></div>

        <div className='form-container'>
          <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
            <h2 data-testid='sign-in-heading'>Reset Your Password</h2>

            <label htmlFor='emailAddress'>New Password</label>
            <input
              type='password'
              placeholder='New Password'
              name='password1'
              value={input.password1}
              onChange={onChange}
              required
              minLength='5'
              data-testid='email-input'
            />

            <label htmlFor='password'>Re-type Password</label>
            <input
              type='password'
              placeholder='Re-type Password'
              name='password2'
              value={input.password2}
              onChange={onChange}
              required
              minLength='5'
              data-testid='password-input'
            />

            <button
              type='submit'
              className='sign-in'
              data-testid='sign-in-button'
            >
              Reset Password
            </button>
          </form>
        </div>
      </SignInContainer>
    );
  } else {
    return <h1>No Token Present</h1>;
  }
};

const mapStateToProps = (state) => {
  return {
    resetPasswordError: state.authentication.resetError,
  };
};

export default connect(mapStateToProps, {
  forgotPassword,
  changePassword,
})(PassReset);
