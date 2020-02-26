import { combineReducers } from 'redux';
import search from './search';
import library from './library';

export default combineReducers({
	search,
	library
});
