/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-07 21:53:02
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 11:55:04
 */
import { defineStore } from 'pinia'
import { Names } from './store-name'
import { getToken, setToken, removeToken, setCurrentUser, getCurrentUser, removeCurrentUser } from '../utils/auth'
import { login, fetchCurrentUser, logout } from '../api/auth';
import { UserLoginRequest } from '../types/auth';

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useDevStore = defineStore(Names.DEV, {
  // other options...
  state: () => {
    return {
      token: getToken(),
      currentUser: getCurrentUser()
    }
  },

  // computed 修饰一些值
  getters: {
    // 取出nickname的第一个字符
    nicknameFirstWord: state => {
      if (!state.currentUser) return;
      const nickname = state.currentUser.nickname;
      return nickname ? nickname.slice(0, 1) : '';
    }
  },

  // methods 可以做同步 异步的操作 提交state
  actions: {
    login(userLoginRequest:UserLoginRequest) {
      return new Promise((resolve, reject) => {
        login(userLoginRequest)
          .then(res => {
            const token:string = res.data.token;
            // 设置token
            this.token = token;
            // 存储到localStorage
            setToken(token);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    me() {
      return new Promise((resolve, reject) => {
        fetchCurrentUser().then(res => {
          const currentUser = res.data;
          // 设置到store中
          this.currentUser = currentUser;
          // 设置到localStorage
          setCurrentUser(currentUser);
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          console.log(res);
          this.token = "";
          this.currentUser = {
            nickname: "",
            roles: []
          }
          removeToken();
          removeCurrentUser();
          resolve(res)
        })
        .catch(error => {
          reject(error);
        })
      })
    }
  }
})