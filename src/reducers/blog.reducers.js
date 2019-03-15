import { blogConstants } from '../constants';

const initialState = {};
initialState['blogs'] = []

export function blogs(state = initialState, action) {
  switch (action.type) {
    case blogConstants.BLOG_GET:
			return {
        blogs: action.blogs
      };
		case blogConstants.BLOG_DELETE:
			var newBlogs = state.blogs
			var removeIndex = newBlogs.findIndex(x => x._id === action.blog._id)
			newBlogs.splice(removeIndex, 1);
			return {
				blogs: newBlogs
			};
		case blogConstants.BLOG_REMOVE:
			return {
				blogs: initialState
			};
    default:
      return state
  }
}