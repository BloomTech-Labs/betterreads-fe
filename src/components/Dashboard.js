import React from 'react';
import axios from 'axios';

const Dashboard = props => {
	const signOut = () => {
		axios
			.get('http://localhost:5000/api/auth/signout', {
				withCredentials: true
			})
			.then(response => {
				localStorage.removeItem('user_id');
				props.history.push('/');
			})
			.catch(error => console.log(error));
	};

	return (
		<div>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
};

export default Dashboard;
