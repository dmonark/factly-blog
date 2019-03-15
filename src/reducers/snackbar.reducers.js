import { snackbarConstants } from '../constants';

const initialState = {show: false, message: ""}

export function snackbar(state = initialState, action) {
  switch (action.type) {
    case snackbarConstants.SNACKBAR_SHOW:
			return {
        show: true,
				message: action.msg
      };
		case snackbarConstants.SNACKBAR_REMOVE:
			return {
        show: false,
				message: ""
      };
    default:
      return state
  }
}