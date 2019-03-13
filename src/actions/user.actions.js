import { userConstants } from '../constants';
import { history } from '../helpers';

export const userActions = {
  login,
  logout
};

function login(user) {
	return { type: userConstants.LOGIN_SUCCESS, user };
}

function logout() {
  return { type: userConstants.LOGOUT };
}