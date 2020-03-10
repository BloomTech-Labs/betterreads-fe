import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { Checkbox, Col, Row } from 'antd';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Wrapper = styled.div`
	.ant-checkbox-wrapper{
		font-weight: 300;
		font-size: 13px;
		line-height: 18px;
		display: flex;
		align-items: center;
		color: #151522;
		mix-blend-mode: normal;
		opacity: 0.7;
		margin: 3
		.ant-checkbox-input{
			background: #FFFFFF;
			box-sizing: border-box;
			box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
			border-radius: 6px;
			width: 24px;
			highth: auto;
		}
		.ant-checkbox-wrapper-inner{
			background: #FFFFFF;
			box-shadow: 0px 4px 8px rgba(50, 50, 71, 0.06), 0px 4px 4px rgba(50, 50, 71, 0.08);
			border: 1px solid #E4E4E4;
			color: #E4E4E4
	}
	
`;

const Heading = styled.h1`
	font-weight: 600;
	font-size: 34px;
	line-height: 41px;
	color: rgba(21, 21, 34, 0.7);
`;
const Sub = styled.p`
	font-weight: 300;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.5px;
	color: #151522;
`;
const Submit = styled.button`
font-weight: 300;
font-size: 16px;
line-height: 22px;
display: flex;
align-items: center;
text-align: center;
color: #FFFFFF;
background: #9C9EA9;
border-radius: 5px;
width: 150px;
highth: 50px;
`


export function OnboardingQuiz(props) {
	let checkedArr = [];

	function handleChange(checkedValues) {
		console.log('checked = ', checkedValues);
		let checkedArr = checkedValues
		console.log(checkedArr, "checked Arr")
	}

	function handleSubmit(event) {
		event.preventDefault();
		const userId = localStorage.getItem('user_id');
		Axios.post(
			`${API_URL}/api/genres`,
			{ genres: checkedArr, userId },
			{ withCredentials: true }
		)

			.then(response => {
				console.log(response);
				props.history.push('/library');
			})
			.catch(error => console.log(error));
	}

	const checkGenre = [
		'Art',
		'Biography',
		'Business',
		'Chick Lit',
		'Christian',
		'Classics',
		'Comics',
		'Contemporary',
		'Cookbooks',
		'Graphic Novels',
		'Historical Fiction',
		'History',
		'Horror',
		'Humor and Comedy',
		'Manga',
		'Memoir',
		'Music',
		'Mystery',
		'Mystery',
		'Paranormal',
		'Philosophy',
		'Poetry',
		'Psychology',
		'Religion',
		'Romance',
		'Science',
		'Science Fiction',
		'Self Help',
		'Suspense',
		'Spirituality',
		'Sports',
		'Thriller',
		'Travel',
		'Young Adult'
	];

	return (
		<Wrapper>
			<Heading>Select your favorite genres</Heading>
			<Sub>Select at least one genre to continue</Sub>
			<div>
				<form onSubmit={handleSubmit}>
					<Checkbox.Group onChange={handleChange}>
						<Row
							type="flex"
							justify="center"
							gutter={{ xs: 0, sm: 16, md: 24, lg: 32 }}
						>
							{checkGenre.map(CB => (
								<Col span="11">
									<Checkbox value={CB}>{CB}</Checkbox>
								</Col>
							))}
						</Row>
					</Checkbox.Group>

					<input type="submit" value="Continue" />
				</form>
			</div>
		</Wrapper>
	);
}

const mapStateToProps = state => {
	return {
		searchResults: state.searchResults,
		error: state.error,
		Fetching: state.Fetching
	};
};

export default connect(mapStateToProps)(OnboardingQuiz);
