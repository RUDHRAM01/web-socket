import { getRequest } from "../process";

const getAllNotification = () => {
  return getRequest(`notifications`); 
};

export { getAllNotification };