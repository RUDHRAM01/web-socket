import { postRequest } from "../process";

const deleteNotification = (body) => {
  return postRequest(`notifications`,body); 
};

export { deleteNotification };