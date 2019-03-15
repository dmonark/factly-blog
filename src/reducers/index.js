import { combineReducers } from 'redux';
import { auth } from './auth.reducers';
import { blogs } from './blog.reducers';
import { filter } from './filter.reducers';
import { snackbar } from './snackbar.reducers';

const rootReducer = combineReducers({
  auth,
	blogs,
	filter,
	snackbar
});

export default rootReducer;