import { combineReducers } from 'redux';
import { reducer as library } from './library';
import { reducer as search } from './search';
import authentication from './authentication';
import { reducer as book } from './book'

export default combineReducers({
	authentication,
	library,
	search,
	book
});
