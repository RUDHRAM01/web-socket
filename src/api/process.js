import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import CryptoJS from 'crypto-js'
import cryptoRandomString from 'crypto-random-string'


const getRequest =  (path) => {
    const requestId = uuidv4()
	const token = cryptoRandomString({
		length: 12,
		type: 'base64',
	})
    const config = {
        withCredentials: true,
        headers: {
            'x-app-type': 'RsRequest',
            'x-request-id': requestId,
            'x-hashed-id': CryptoJS.AES.encrypt(
                requestId,
                token
            ).toString(),
            'x-request-token': token,
        },
    };
    return axios.get(`${process.env.REACT_APP_MAIN}${path}`,config);
}

const postRequest = (path, body) => {
    const requestId = uuidv4()
	const token = cryptoRandomString({
		length: 12,
		type: 'base64',
	})
    const config = {
        withCredentials: true,
        headers: {
            'x-app-type': 'RsRequest',
            'x-request-id': requestId,
            'x-hashed-id': CryptoJS.AES.encrypt(
                requestId,
                token
            ).toString(),
            'x-request-token': token,
        },
    };
    return axios.post(`${process.env.REACT_APP_MAIN}${path}`,body,config);
}


export {getRequest,postRequest}