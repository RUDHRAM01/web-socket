import { getRequest } from "../process";

const GetAllUsersApi = () => {
  return getRequest(`users/allusers`); 
};

export { GetAllUsersApi };