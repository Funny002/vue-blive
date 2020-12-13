import Axios from 'axios'

const baseURL = 'http://localhost:8000'
const axios = Axios.create({
    baseURL,
    method: "get",
    timeout: 1000 * 3,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

/** 请求拦截 */
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

/** 响应拦截 */
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default axios
