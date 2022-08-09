/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:11:04
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 17:42:12
 */
import axios from "axios";
import notify from "../utils/notify";
import { useDevStore } from '../store/index'

const baseURL = import.meta.env.VITE_API_HOST;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const whitelist = ['/auth/login', '/auth/register']
    // 白名单不携带token
    if (config.url && whitelist.includes(config.url)) {
      return config;
    }
    const store = useDevStore();

    if (store.token) {
      config!.headers!['token'] = store.token
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.data.code !== 2000) {
      handleErrorResponse(response)
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    handleErrorResponse(error.response)
    return Promise.reject(error)
  }
);

const handleErrorResponse = (response:any) => {
  notify.error(response.message);
};

export default instance;