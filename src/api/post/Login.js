import { postRequest } from "../process";

const LoginApi = (body) => {
  return postRequest(`users/login`,body); 
};

export { LoginApi };