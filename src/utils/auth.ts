/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-08 00:52:05
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-09 12:37:32
 */
import Cookies from 'js-cookie';

const TokenKey = 'xm'

const UserKey = 'current-user'

// 过期时间设置为一小时
const expiresTime = new Date(new Date().getTime() + 1000 * 60 * 60);

export const getToken = () => {
  return Cookies.get(TokenKey)
}

export const setToken = (token:string) => {
  return Cookies.set(TokenKey, token, {
    expires: expiresTime
  })
}

export const removeToken = () => {
  Cookies.remove(TokenKey)
}

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey)
  return user === undefined ? null : JSON.parse(user)
}

export const setCurrentUser = (currentUser:object) => {
  return Cookies.set(UserKey, JSON.stringify(currentUser), {
    expires: expiresTime
  })
}

export const removeCurrentUser = () => {
  Cookies.remove(UserKey)
}