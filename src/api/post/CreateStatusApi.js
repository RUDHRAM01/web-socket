import { postRequest } from "../process";

const CreateStatusApi = (body,color,content) => {
  body.append('color', color);
  body.append('content', content);
  return postRequest(`status`,body); 
};

export { CreateStatusApi };