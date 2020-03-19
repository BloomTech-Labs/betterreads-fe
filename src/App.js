import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
import Library from './components/library/Library';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import Success from './components/authentication/Success';
import Failure from './components/authentication/Failure';
import PageNotFound from './components/authentication/PageNotFound';
import Search from './components/search/Search';
import Shelf from './components/library/Shelf';
import ShelfBook from './components/library/ShelfBook';

const App = () => {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/" component={Library} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/success" component={Success} />
				<Route path="/failure" component={Failure} />
				<Route path="/pagenotfound" component={PageNotFound} />
				<PrivateRoute path="/search" component={Search} />
				<PrivateRoute path="/book/:id" component={ShelfBook} />
				<PrivateRoute exact path="/shelf/:shelf" component={Shelf} />
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
};

export default App;
