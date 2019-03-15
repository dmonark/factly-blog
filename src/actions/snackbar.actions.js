import { snackbarConstants } from '../constants';

export const snackbarActions = {
  addSnackbar,
	removeSnackbar
};

function addSnackbar(msg) {
	return { type: snackbarConstants.SNACKBAR_SHOW, msg};
}

function removeSnackbar(msg) {
	return { type: snackbarConstants.SNACKBAR_REMOVE };
}