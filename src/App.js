import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import { PageView } from './components/tracking';
import LandingPage from './components/LandingPage';
import SignUp from './components/authentication/SignUp';
import SignIn from './components/authentication/SignIn';
import Success from './components/authentication/Success';
import Failure from './components/authentication/Failure';
import PageNotFound from './components/authentication/PageNotFound';
import Library from './components/library/Library';
import Search from './components/search/Search';
import BookDetails from './components/BookDetails';

const App = () => {

	useEffect(() => {
		PageView();
	}, [])

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
				<Route path="/success" component={Success} />
				<Route path="/failure" component={Failure} />
				<Route path="/pagenotfound" component={PageNotFound} />

				<PrivateRoute path="/library" component={Library} />
				<PrivateRoute path="/search" component={Search} />
				<PrivateRoute path="/book/:id" component={BookDetails} />

				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default App;
