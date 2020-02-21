import React from 'react';
import { render } from '@testing-library/react';
import Search from '../components/search/Search';

test('Search is rendering', () => {
    render(<Search />);
})