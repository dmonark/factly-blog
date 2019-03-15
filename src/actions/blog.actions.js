import { blogConstants } from '../constants';

export const blogActions = {
  addBlog,
};

function addBlog(blogs) {
	return { type: blogConstants.BLOG_GET, blogs};
}