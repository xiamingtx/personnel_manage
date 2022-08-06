/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:11:04
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 18:53:53
 */
import axios from "axios";
import { Notify } from "quasar";
import notify from "../utils/notify";

const baseURL = import.meta.env.VITE_API_HOST;
const tokenPrefix = "Bearer ";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
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
    if (response.data.code) {
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

const { get, post, put, delete:Delete } = instance;

export { get, post, put, Delete };