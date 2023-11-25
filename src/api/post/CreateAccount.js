import { postRequest } from "../process";

const CreateAccountApi = (body) => {
  return postRequest(`users/register`,body); 
};

export { CreateAccountApi };