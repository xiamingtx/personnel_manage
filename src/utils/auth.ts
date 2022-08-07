/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-08 00:52:05
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 00:52:14
 */
import Cookies from 'js-cookie';

const TokenKey = 'xm'

const UserKey = 'current-user'

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = (token:string) => {
  return Cookies.set(TokenKey, token)
}

export const removeToken = () => {
  Cookies.remove(TokenKey)
}

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey)
  return user === undefined ? null : JSON.parse(user)
}

export const setCurrentUser = (currentUser:object) => {
  return Cookies.set(UserKey, JSON.stringify(currentUser))
}

export const removeCurrentUser = () => {
  Cookies.remove(UserKey)
}