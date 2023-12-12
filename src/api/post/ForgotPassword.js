import { postRequest } from "../process";

const UpdatePasswordApi = (body) => {
  return postRequest(`users/setPassword`,body); 
};

export { UpdatePasswordApi };