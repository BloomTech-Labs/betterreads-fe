import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = props => {
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
		<>
			<button onClick={signOut}>Sign Out</button>
			<SearchForm />
			<SearchList />
		</>
	);
};

export default Search;
