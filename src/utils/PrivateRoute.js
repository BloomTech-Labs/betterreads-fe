import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { user } from '../utils/helpers'

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (user.subject) {
					return <Component {...props} />;
				} else {
					return <Redirect to='/signin' />;
				};
			}}
		/>
	);
};
