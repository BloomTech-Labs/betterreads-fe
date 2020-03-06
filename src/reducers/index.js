import { combineReducers } from 'redux';
import library from './library';
import search from './search';
import authentication from './authentication';
import status from './status';

export default combineReducers({
	authentication,
	library,
	search,
	status
});
