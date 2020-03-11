import React from 'react';
import styled from 'styled-components';

const PageNotFoundContainer = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		margin-bottom: 16px;
		font-family: 'Frank Ruhl Libre', sans-serif;
		font-weight: bold;
		font-size: 2rem;
		color: #4E4C4A;
	}

	button {
		padding: 12px 32px;
		background-color: #d24719;
		border: none;
		border-radius: 4px;
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		color: white;
	}
`;

const PageNotFound = props => {
	return (
		<PageNotFoundContainer>
			<h1>Page not found</h1>
			<button onClick={() => props.history.push('/')}>Go back</button>
		</PageNotFoundContainer>
	);
};

export default PageNotFound;
