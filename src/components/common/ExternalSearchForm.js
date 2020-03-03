import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getGoogleResults } from '../../actions';
import styled from 'styled-components';

const ExternalSearchFormContainer = styled.form`
	padding-bottom: 12px;
	display: flex;

	input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid #d9d9d9;
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
		color: #4e4c4a;
		line-height: 24px;

		::placeholder {
			color: #868585;
		}
	}

	button {
		padding: 12px;
		background-color: #547862;
		border: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		i {
			font-size: 1rem;
			color: #ffffff;
		}
	}
`;

const ExternalSearchForm = props => {
	const [input, setInput] = useState('');

	const onChange = event => {
		setInput(event.target.value);
	};

	const onSubmit = event => {
		event.preventDefault();
		props.getGoogleResults(input);
		props.history.push('/search');
	};

	return (
		<ExternalSearchFormContainer
			className="search-form"
			autoComplete="off"
			spellCheck="false"
			onSubmit={onSubmit}
		>
			<input
				type="text"
				placeholder="Search for a book"
				value={input}
				onChange={onChange}
			/>
			<button type="submit">
				<i className="fas fa-search"></i>
			</button>
		</ExternalSearchFormContainer>
	);
};

export default connect(null, { getGoogleResults })(ExternalSearchForm);
