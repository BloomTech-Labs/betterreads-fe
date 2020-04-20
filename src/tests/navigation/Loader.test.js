import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
//import component
import { renderWithRedux } from '../utils/renderWithRedux';
import LoaderContainer from '../../components/Navigation/Loader';

test('loader/spinner renders', () => {
  const { getByTestId } = renderWithRedux(<LoaderContainer />);
});
