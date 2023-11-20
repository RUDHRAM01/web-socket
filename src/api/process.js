import axios from 'axios'

const getRequest =  (path,body) => {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    
    const config = {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    };

    return axios.get(`http://localhost:4000/api/${path}`,config);
}

const postRequest =  (path, body) => {
    var data = localStorage.getItem('loginInfo');
    data = JSON.parse(data);
    
    const config = {
        headers: {
            Authorization: `Bearer ${data?.token}`,
        },
    };

    return axios.post(`http://localhost:4000/api/${path}`,body, config);
}


export {getRequest,postRequest}