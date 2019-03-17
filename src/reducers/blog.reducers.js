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
			var removeIndex = newBlogs.findIndex(x => x._id === action.blog._id) //find the deleted blog and removing it
			newBlogs.splice(removeIndex, 1);
			return {
				blogs: newBlogs
			};
		case blogConstants.BLOG_REMOVE: //remove all blogs in starting of any blog relted page like /authors, /categories, /
			return {
				blogs: initialState
			};
		case blogConstants.ADD_BLOG:
			var newAddBlogs = state.blogs
			newAddBlogs.unshift(action.blog)
			return {
				blogs: newAddBlogs
			};
    default:
      return state
  }
}