import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {
	return (
		<Router>
			<Route exact path="/" component={LandingPage} />
			<Route path="/signup" component={SignUp} />
			<Route path="/signin" component={SignIn} />
			{/* <Route path="/dashboard" component={LandingPage} />
			<Route path="/mylibrary" component={LandingPage} /> */}
		</Router>
	);
};

export default App;
