import { postRequest } from "../process";

const UpdateNameApi = (body) => {
  return postRequest(`users/updateName`,body); 
};

export { UpdateNameApi };