import { blogActions, snackbarActions } from "./../actions";
import { apiGetCall } from "./network";
export function getAllBlogsService(dispatch, category, author) { //get all blogs from db with filters applied
	var successCallback = function(data) {
		dispatch(blogActions.addBlogs(data));
	}
	
	var errorCallback = function(data) {
		dispatch(snackbarActions.addSnackbar("Something went wrong"));
	}

	var callURL = "/blog?";
	if (category !== "all")
		callURL += "category=" + category + "&";
	
	if (author !== "all")
		callURL += "author=" + author + "&";

	apiGetCall(callURL, successCallback, errorCallback);
}
export function deleteAllBlogsService(dispatch) {
	dispatch(blogActions.deleteEveryBlog());
}