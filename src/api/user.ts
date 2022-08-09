/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-09 11:00:45
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 17:55:40
 */
import request from './request'
import { UserCreateRequest, UserUpdateRequest } from '../types/user'

const prefix:string = "/user"

export const list = () => request.get(prefix + "/list")

export const removeUser = (id:string) => request.delete(`${prefix}/${id}`)


export const getUser = (id:string) => request.get(`${prefix}/${id}`)

export const addUser = (userCreateRequest:UserCreateRequest) => request.post(prefix, userCreateRequest)

export const updateUser = (userUpdateRequest:UserUpdateRequest) => request.put(prefix, userUpdateRequest)