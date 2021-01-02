import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3000/api/v1/admin',
    timeout: 5000
});

request.interceptors.response.use(response => {
    return response.data;
}, error => {
    console.log(error);  // for debug

    return error.response.data;
});

export default request;


export const getDefaultHeaders = (token) => {
    return {
        'Authorization': `Bearer ${token}`
    }
};

export const clearObject = (obj, extra = false) => {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }

        if (extra && propName === 'active') { // convert boolean to integer
            obj[propName] === true ? obj[propName] = 1 : 0;
        }
    }

    return obj;
};

export const getStringQuery = (obj) => {

    if (!obj) return '';
    return cleanArray(
        Object.keys(obj).map(key => {
            if (obj[key] === undefined) return '';
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
        })
    ).join('&')
};

export function cleanArray(actual) {
    const newArray = [];
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}