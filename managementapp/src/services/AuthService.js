/* eslint-disable */
import api from "./Api";
import TokenService from "./TokenService";

class AuthService {
  login(payload) {
    console.log("auth", payload);
    return api
      .post("api/auth/login", payload)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          let resp = response.data;
          let user = {
            type: resp.userType,
            user: resp.username,
            access: resp.accessToken,
          };
          TokenService.setcurrentUser(user);
          return user;
        }
      });
  }

  logout() {
    TokenService.removeUser();
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}
export default new AuthService();
