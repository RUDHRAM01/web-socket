import axios from 'axios'

const getRequest =  (path) => {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    
    const config = {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    };

    return axios.get(`${process.env.REACT_APP_MAIN}${path}`,config);
}

const postRequest =  (path, body) => {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    
    const config = {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    };

    return axios.post(`${process.env.REACT_APP_MAIN}${path}`,body, config);
}


export {getRequest,postRequest}