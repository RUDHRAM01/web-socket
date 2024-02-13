import { postRequest } from "../process";

const LoginAsGuestApi = (body) => {
  return postRequest(`users/login-as-guest`,body); 
};

export { LoginAsGuestApi };