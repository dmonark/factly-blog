import { blogConstants } from '../constants';

const initialState = {};
initialState['blogs'] = []

export function blogs(state = initialState, action) {
  switch (action.type) {
    case blogConstants.BLOG_GET:
			return {
        blogs: action.blogs
      };
    default:
      return state
  }
}