/* eslint-disable */
import AuthService from "services/AuthService";
import TokenService from "services/TokenService";

export async function loginUser(dispatch, email, password) {
  try {
    let payload = {
      email: email,
      password: password
    }
    dispatch({
      type: "REQUEST_LOGIN"
    });
    let data = await AuthService.login(payload);
    if (data.user) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data
      });
      return data;
    }
    dispatch({
      type: "LOGIN_ERROR",
      error: data
    });
    return;
  } catch (error) {
    dispatch({
      type: "LOGIN_ERROR",
      error: error
    });
  }
}

export async function logout(dispatch) {
  dispatch({
    type: "LOGOUT"
  });
  TokenService.removecurrentUser();
}