import React from 'react';

const LandingPage = props => {
	return (
		<div>
			<p>This is the landing page.</p>
			<button onClick={() => props.history.push('/signup')}>
				Get Started
			</button>
		</div>
	);
};

export default LandingPage;
