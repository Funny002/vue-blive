import qs from 'qs';
import axios from "axios";

// api 地址
const baseURL = process.env.NODE_ENV === "development" ? '' : 'http:127.0.0.1';

// headers 头
let headers = {
    'Content-Type': 'application/json; charset=UTF-8'
}

// 默认请求方式
const method = "GET";

// 超时
const timeout = 1000 * 3;

// 是否给与跨域凭证
const withCredentials = false;

// 服务器响应，数据类型
const responseType = 'json';

// 向服务器发送前，处理数据
// const transformRequest = [function (data, headers) {
//     console.log('transformRequest:', data, headers)
//     return data
// }]

// 响应传递前，处理数据
const transformResponse = [function (data) {
    return data
}]

// // 上传处理进度事件
// const onUploadProgress = function (progressEvent) {
//     console.log('onUploadProgress:', progressEvent)
// }

// // 下载处理进度事件
// const onDownloadProgress = function (progressEvent) {
//     console.log('onDownloadProgress:', progressEvent)
// }

// `params` 序列化，处理函数
const paramsSerializer = function (params) {
    return qs.stringify(params, {arrayFormat: 'brackets'})
}

// 请求状态码范围
const validateStatus = function (status) {
    return status >= 200 && status < 300
}

/** 初始化实例 */
const Axios = axios.create({
    method,
    timeout,
    headers,
    baseURL,
    responseType,
    validateStatus,
    withCredentials,
    // transformRequest,
    paramsSerializer,
    transformResponse,
    // onUploadProgress,
    // onDownloadProgress
})

// // 添加请求拦截器
// let request = Axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// // 添加响应拦截器
// let response = Axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });
//
// // 动态拦截器
// export function setRequest(Axios, Request = false) {
//     if (!Request) {
//         Axios.interceptors.request.eject(request)
//     } else if (typeof Request === "function") {
//         request = Axios.interceptors.request.use(Request.success, Request.error)
//     }
//     return false
// }
//
// // 动态响应器
// export function setResponse(Axios, Response = false) {
//     if (!Response) {
//         Axios.interceptors.response.eject(response)
//     } else if (typeof Response === "function") {
//         response = Axios.interceptors.response.use(Response.success, Response.error)
//     }
//     return false
// }

export default Axios
