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
				props.history.push('/');
			})
			.catch(error => console.log(error));
	};

	return (
		<div>
			<h1>
				store user object in local storage and redirect to protected
				dashboard
			</h1>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
};

export default Success;
