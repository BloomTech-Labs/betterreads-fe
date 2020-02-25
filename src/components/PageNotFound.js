import React from 'react';
import styled from 'styled-components';

const PageNotFoundContainer = styled.div``;

const PageNotFound = props => {
	return (
		<PageNotFoundContainer>
			<h1>Page not found</h1>
			<button onClick={() => props.history.push('/')}>Go back</button>
		</PageNotFoundContainer>
	);
};

export default PageNotFound;
