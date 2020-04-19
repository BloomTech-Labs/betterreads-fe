import React, { useEffect } from 'react';
// Utils
import history from '../../utils/history';
import { PageView, Event } from '../../utils/tracking';

import PageNotFoundContainer from './styles/PageNotFoundStyle';

const PageNotFound = () => {
  useEffect(() => {
    Event(
      'NOT_FOUND',
      'Page not found. A user got lost on their journey.',
      'NOT_FOUND'
    );
    PageView();
  }, []);

  return (
    <PageNotFoundContainer>
      <h1 data-testid='page-not-found'>Page not found</h1>
      <button onClick={() => history.push('/')} data-testid='go-back'>
        Go back
      </button>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
