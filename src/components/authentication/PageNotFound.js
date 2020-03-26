import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageView, Event } from '../../utils/tracking';

const PageNotFoundContainer = styled.div`
	height: 90vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		margin-bottom: 8px;
		font-family: 'Frank Ruhl Libre', sans-serif;
		font-weight: bold;
		font-size: 2.5rem;
		color: #4E4C4A;
	}

	button {
		padding: 10px 32px;
		background-color: #d24719;
		border: none;
		border-radius: 4px;
		font-family: 'Open Sans', sans-serif;
		font-size: 0.875rem;
		font-weight: 600;
		color: white;
		cursor: pointer;
		transition: 0.25s;

		:hover {
			opacity: 0.75;
		}
	}
`;

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
