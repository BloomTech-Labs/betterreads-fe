import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import  ReactGA from 'react-ga';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Success from './components/Success';
import Failure from './components/Failure';
import PageNotFound from './components/PageNotFound';
import Search from './components/search/Search';
import BookDetails from './components/BookDetails';

function initAnalytics() {
	ReactGA.initialize('UA-159089625-1');
	ReactGA.pageview(window.location.pathname + window.location.search);
}

const App = () => {

	useEffect(() => {
		initAnalytics();
		ReactGA.event({category: 'App', action: 'Loaded BetterReads'}, [])
	})

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
				<Route path="/success" component={Success} />
				<Route path="/failure" component={Failure} />
				<Route path="/pagenotfound" component={PageNotFound} />

				<PrivateRoute path="/search" component={Search} />
				<PrivateRoute path="/book/:id" component={BookDetails} />

				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default App;
