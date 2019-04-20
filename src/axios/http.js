import axios from 'axios'
import ROOT from '../api/rootURL'

axios.defaults.baseURL = ROOT.url;//请求地址
axios.defaults.timeout = 10000; //请求超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //post请求格式设置
export function get(url, params, config){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params,
            ...config
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}