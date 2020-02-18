import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {
	return (
		<Router>
			<Route exact path="/" component={LandingPage} />
			{/* <Route path="/signup" component={LandingPage} />
			<Route path="/signin" component={LandingPage} />
			<Route path="/dashboard" component={LandingPage} />
			<Route path="/mylibrary" component={LandingPage} /> */}
		</Router>
	);
};

export default App;
