import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SuccessContainer = styled.div`
	height: 90vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Success = props => {
	useEffect(() => {
		axios
			.get('http://localhost:5000/api/auth/success', {
				withCredentials: true
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('user_id', response.data.user.id);
				props.history.push('/library');
			})
			.catch(error => console.log(error));
	}, []);

	return (
		<SuccessContainer>
			{/* loading wheel icon should go here */}
			<p>Loading...</p>
		</SuccessContainer>
	);
};

export default Success;
