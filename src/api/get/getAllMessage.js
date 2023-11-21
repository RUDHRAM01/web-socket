import { getRequest } from "../process";

const getMessageApi = (id) => {
  return getRequest(`messages/${id}`); 
};

export { getMessageApi };