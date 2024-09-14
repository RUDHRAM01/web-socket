import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import cryptoRandomString from "crypto-random-string";

const generateHeaders = () => {
  const data = localStorage.getItem("loginInfo");
  let to = JSON.parse(data);
  to = to?.token;

  const requestId = uuidv4();
  const token = cryptoRandomString({
    length: 12,
    type: "base64",
  });

  return {
    Authorization: `Bearer ${to}`,
    "x-app-type": "RsRequest",
    "x-request-id": requestId,
    "x-hashed-id": CryptoJS.AES.encrypt(requestId, token).toString(),
    "x-request-token": token,
  };
};

const isTokenExpired = (error) => {
  if (
    error.response.status === 401 &&
    error.response.data.msg === "token-exp"
  ) {
    const token = error.response.data.token;
    const data = localStorage.getItem("loginInfo");
    let to = JSON.parse(data);
    to.token = token;
    localStorage.setItem("loginInfo", JSON.stringify(to));
    return true;
  }
  return false;
};

const getRequest = async (path) => {
  const config = {
    withCredentials: true,
    headers: generateHeaders(),
  };

  try {
    const data = await axios.get(
      `${process.env.REACT_APP_MAIN}${path}`,
      config
    );
    return data;
  } catch (error) {
    if (isTokenExpired(error)) {
      return getRequest(path);
    }
    return error;
  }
};

const postRequest = async (path, body) => {
  const config = {
    withCredentials: true,
    headers: generateHeaders(),
  };
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_MAIN}${path}`,
      body,
      config
    );
    return data;
  } catch (error) {
    if (isTokenExpired(error)) {
      return postRequest(path, body);
    }
    return error;
  }
};

export { getRequest, postRequest };