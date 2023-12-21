import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import cryptoRandomString from 'crypto-random-string';
import toast from 'react-hot-toast';

const generateHeaders = () => {
    const data = localStorage.getItem('loginInfo');
    const to = JSON.parse(data)?.token;
    const requestId = uuidv4();
    const token = cryptoRandomString({
        length: 12,
        type: 'base64',
    });

    return {
        'Authorization': `Bearer ${to}`,
        'x-app-type': 'RsRequest',
        'x-request-id': requestId,
        'x-hashed-id': CryptoJS.AES.encrypt(requestId, token).toString(),
        'x-request-token': token,
    };
};

const getRequest = (path) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };

    return axios.get(`${process.env.REACT_APP_MAIN}${path}`, config)
        .catch((error) => {
            // Handle errors here
            console.error('Error in GET request:', error);
           toast.error(error?.response?.data?.msg || 'something went wrong' );
        });
};

const postRequest = (path, body) => {
    const config = {
        withCredentials: true,
        headers: generateHeaders(),
    };

    return axios.post(`${process.env.REACT_APP_MAIN}${path}`, body, config)
        .catch((error) => {
            console.error('Error in POST request:', error);
            toast.error(error?.response?.data?.msg || 'something went wrong' );
        });
};

export { getRequest, postRequest };