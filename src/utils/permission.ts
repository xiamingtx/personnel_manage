/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-08 11:14:03
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-08 12:15:50
 */
import router from '../router'
import { useDevStore } from '../store'
import { getToken } from '../utils/auth.js'
import notify from '../utils/notify'

const whiteList = ['/login', '/403', '/404', '/register']

router.beforeEach(async (to, from, next) => {
  const store = useDevStore();
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const currentUser = store.currentUser
      const adminRole = currentUser.roles.find((item:any) => {
        return item.name === 'admin'
      })
      if (adminRole) {
        next()
      } else {
        await store.logout();
        notify.error("无权登录后台");
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})