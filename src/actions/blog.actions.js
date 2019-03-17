import { blogConstants } from '../constants';

export const blogActions = {
  addBlogs,
	deleteBlog,
	deleteEveryBlog,
	addOneBlog
};

function addBlogs(blogs) {
	return { type: blogConstants.BLOG_GET, blogs};
}

function deleteBlog(blog) {
	return { type: blogConstants.BLOG_DELETE, blog}
}

function deleteEveryBlog() {
	return { type: blogConstants.BLOG_REMOVE}
}

function addOneBlog(blog) {
	return { type: blogConstants.ADD_BLOG, blog}
}