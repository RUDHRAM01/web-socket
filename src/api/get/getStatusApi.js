import { getRequest } from "../process";

const getStatusApi = () => {
  return getRequest(`status`); 
};

export { getStatusApi };