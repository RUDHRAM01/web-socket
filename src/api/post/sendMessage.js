import { postRequest } from "../process";

const sendMessageApi = (body) => {
  return postRequest(`messages`,body); 
};

export { sendMessageApi };