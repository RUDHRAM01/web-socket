import { postRequest } from "../process";

const GreetingMessageApi = (body) => {
  return postRequest(`users/greetingMessage`,body); 
};

export { GreetingMessageApi };