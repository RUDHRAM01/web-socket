import { postRequest } from "../process";

const VerifyEmailApi = (body) => {
  return postRequest(`users/updatePassword`,body); 
};

export { VerifyEmailApi };