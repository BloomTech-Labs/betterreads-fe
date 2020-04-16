import React, { useEffect } from 'react';
// Utils
import history from '../../utils/history';
import { PageView, Event } from '../../utils/tracking';

import PageNotFoundContainer from './styles/PageNotFoundStyle';

const PageNotFound = (props) => {
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
      <h1>Page not found</h1>
      <button onClick={() => history.push('/')}>Go back</button>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
