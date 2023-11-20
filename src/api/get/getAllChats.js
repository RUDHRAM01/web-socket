import { getRequest } from "../process";

const getAllChats = () => {
  return getRequest(`chats`); 
};

export { getAllChats };