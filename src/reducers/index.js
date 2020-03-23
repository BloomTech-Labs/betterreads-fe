import { combineReducers } from 'redux';
import { reducer as library } from './library';
import { reducer as search } from './search';
import { reducer as authentication } from './authentication';
import { reducer as book } from './book'
import { reducer as shelf } from './shelf'

export default combineReducers({
	authentication,
	library,
	search,
	book,
	shelf
});
