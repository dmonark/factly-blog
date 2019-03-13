import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
let token = localStorage.getItem('token');

const initialState = user ? { user, token } : {};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
			return {
        user: action.user,
				token: action.token
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}