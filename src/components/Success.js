import React, { useEffect } from 'react';
import axios from 'axios';

const Success = props => {
	useEffect(() => {
		axios
			.get('http://localhost:5000/api/auth/success', {
				withCredentials: true
			})
			.then(response => {
				console.log(response);
				localStorage.setItem('user_id', response.data.user.id);
				props.history.push('/dashboard');
			})
			.catch(error => console.log(error));
	}, []);

	const signOut = () => {
		axios
			.get('http://localhost:5000/api/auth/signout', {
				withCredentials: true
			})
			.then(response => {
				console.log('signed out successfully');
				localStorage.removeItem('user_id');
				props.history.push('/');
			})
			.catch(error => console.log(error));
	};

	return (
		<div>
			<p>Loading</p>
		</div>
	);
};

export default Success;
