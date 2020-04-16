import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageView, Event } from '../../utils/tracking';

import PageNotFoundContainer from "./styles/PageNotFoundStyle";

const PageNotFound = props => {
	useEffect(() => {
		Event('NOT_FOUND', 'Page not found. A user got lost on their journey.', 'NOT_FOUND');
		PageView();
	}, []);

	return (
		<PageNotFoundContainer>
			<h1>Page not found</h1>
			<button onClick={() => props.history.push('/')}>Go back</button>
		</PageNotFoundContainer>
	);
};

export default PageNotFound;
