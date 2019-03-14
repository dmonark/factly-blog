import { userConstants } from '../constants';

export const userActions = {
  login,
  logout
};

function login(user, token) {
	return { type: userConstants.LOGIN_SUCCESS, user, token };
}

function logout() {
  return { type: userConstants.LOGOUT };
}