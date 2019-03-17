import { filterActions, snackbarActions } from "./../actions";
import { apiGetCall } from "./network";
export function getAllAuthorService(dispatch) {
	var successCallback = function(data) {
		dispatch(filterActions.addAuthor(data));
	}

	var errorCallback = function(data) {
		dispatch(snackbarActions.addSnackbar("Something went wrong"));
	}
		
	apiGetCall("/user", successCallback, errorCallback);
}