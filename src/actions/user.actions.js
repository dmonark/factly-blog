import { userConstants } from '../constants';

export const userActions = {
  login,
  logout,
	update
};

function login(user, token) {
	return { type: userConstants.LOGIN_SUCCESS, user, token };
}

function update(user) {
	return { type: userConstants.USER_UPDATE, user};
}

function logout() {
  return { type: userConstants.LOGOUT };
}