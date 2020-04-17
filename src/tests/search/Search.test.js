import React from 'react';
import Search from '../../components/search/Search';
// Test Utils
import { renderWithRedux } from '../utils/renderWithRedux';

test('component renders', () => {
	renderWithRedux(<Search /> );
});