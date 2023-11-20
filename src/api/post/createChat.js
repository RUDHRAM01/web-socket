import { postRequest } from "../process";

const createChat = (body) => {
  return postRequest(`chats`,body); 
};

export { createChat };