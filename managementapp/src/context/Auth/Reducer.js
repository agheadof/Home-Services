/* eslint-disable */
/* eslint-disable prefer-const */
// Context/reducer.js

let user = localStorage.getItem("currentUser") ?
  JSON.parse(localStorage.getItem("currentUser")).user :
  "";
let token = localStorage.getItem("currentUser") ?
  JSON.parse(localStorage.getItem("currentUser")).auth_token :
  "";

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  isLoggedIn: false,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
          token: action.payload.access,
          isLoggedIn: true,
          loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoggedIn: false,
          user: null,
          token: "",
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
          errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};