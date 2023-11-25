import { getRequest } from "../process";

const SearchUserApi = (value) => {
  return getRequest(`users/search?search=${value}`); 
};

export { SearchUserApi };