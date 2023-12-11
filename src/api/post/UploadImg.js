import { postRequest } from "../process";

const UploadImageApi = (body) => {
  return postRequest(`users/uploadImg`,body); 
};

export { UploadImageApi };