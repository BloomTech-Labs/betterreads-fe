import React from 'react';

const Failure = props => {
	return (
		<div>
			<h1>There was an error.</h1>
			<button onClick={() => props.history.push('/')}>Go Back</button>
		</div>
	);
};

export default Failure;
