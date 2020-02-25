import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Success from './components/Success';
import Failure from './components/Failure';
import Dashboard from './components/Dashboard';
import Search from './components/search/Search';
import BookDetails from './components/BookDetails';

const App = () => {
	return (
		<Router>
			<Route exact path="/" component={LandingPage} />
			<Route path="/signup" component={SignUp} />
			<Route path="/signin" component={SignIn} />
			<Route path="/success" component={Success} />
			<Route path="/failure" component={Failure} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/search" component={Search} />
			<Route path="/book/:id" component={BookDetails} />
		</Router>
	);
};

export default App;
