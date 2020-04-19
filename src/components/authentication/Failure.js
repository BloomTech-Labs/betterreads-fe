import React, { useEffect } from 'react';
// Utils
import { PageView, Event } from '../../utils/tracking';
import history from '../../utils/history';

import FailureContainer from './styles/FailureStyle';

const Failure = () => {
  useEffect(() => {
    Event('SIGN IN', 'Failure to sign in', 'SIGN_IN');
    PageView();
  }, []);

  return (
    <FailureContainer>
      <h1 data-testid="failure-title">There was an error</h1>
      <button
        data-testid="button"
        onClick={() => {
          history.push('/');
          Event('SIGN IN', 'User was redirected to signIn', 'FAILURE');
        }}
      >
        Go Back
      </button>
    </FailureContainer>
  );
};

export default Failure;
