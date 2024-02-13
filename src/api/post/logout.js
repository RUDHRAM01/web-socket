import { postRequest } from "../process";

const LogoutApi = (body) => {
  return postRequest(`users/logout`,body); 
};

export { LogoutApi };