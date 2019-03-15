import { combineReducers } from 'redux';
import { auth } from './auth.reducers';
import { blogs } from './blog.reducers';
import { authors } from './authors.reducers';

const rootReducer = combineReducers({
  auth,
	blogs,
	authors
});

export default rootReducer;