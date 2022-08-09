/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:24:29
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 11:00:58
 */
/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:24:29
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 10:32:47
 */
import { post, get } from './request'
import { UserLoginRequest, UserRegisterRequest } from '../types/auth'

const prefix:string = "/auth";

export const login = (userLoginRequest:UserLoginRequest) => post( prefix + "/login", userLoginRequest);

export const getCode = (mail:string) => post(`${prefix} + '/code?mail=' + ${mail}`)

export const register = (userRegisterRequest:UserRegisterRequest) => post(prefix + "/register", { userRegisterRequest})

export const logout = () => post(prefix + "/logout");

export const fetchCurrentUser = () => get(prefix + "/me");
