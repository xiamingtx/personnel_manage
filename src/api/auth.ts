/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:24:29
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 17:42:29
 */
/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:24:29
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 10:32:47
 */
import request from './request'
import { UserLoginRequest, UserRegisterRequest } from '../types/auth'

const prefix:string = "/auth";

export const login = (userLoginRequest:UserLoginRequest) => request.post( prefix + "/login", userLoginRequest);

export const getCode = (mail:string) => request.post(`${prefix} + '/code?mail=' + ${mail}`)

export const register = (userRegisterRequest:UserRegisterRequest) => request.post(prefix + "/register", { userRegisterRequest})

export const logout = () => request.post(prefix + "/logout");

export const fetchCurrentUser = () => request.get(prefix + "/me");
