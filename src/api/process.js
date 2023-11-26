import axios from 'axios'

const getRequest =  (path) => {

    return axios.get(`${process.env.REACT_APP_MAIN}${path}`);
}

const postRequest =  (path, body) => {
    
    return axios.post(`${process.env.REACT_APP_MAIN}${path}`,body);
}


export {getRequest,postRequest}