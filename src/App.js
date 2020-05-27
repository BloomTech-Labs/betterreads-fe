import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';
// Components
import Library from './components/library/Library';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import PassReset from './components/authentication/PassReset';
import Success from './components/authentication/Success';
import Failure from './components/authentication/Failure';
import PageNotFound from './components/authentication/PageNotFound';
import Search from './components/search/Search';
import ShelfBook from './components/library/ShelfBook';
import Shelf from './components/library/Shelf';
import Shelves from './components/library/Shelves';
import OnboardingQuiz from './components/authentication/OnboardingQuiz';
import LandingPage from './components/Landing/Landing';
// History Util
import history from './utils/history';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path='/home' component={Library} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/reset' component={PassReset} />
        <Route exact path='/quiz' component={OnboardingQuiz} />
        <Route exact path='/success' component={Success} />
        <Route exact path='/failure' component={Failure} />
        <Route exact path='/pagenotfound' component={PageNotFound} />
        <PrivateRoute exact path='/search' component={Search} />
        <PrivateRoute exact path='/book/:id' component={ShelfBook} />
        <PrivateRoute exact path='/shelf/:shelf' component={Shelf} />
        <PrivateRoute exact path='/myshelves' component={Shelves} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
