/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 17:14:20
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-06 18:50:36
 */
import { Notify } from 'quasar'

const success = (message:string) => {
  Notify.create({
    type: 'positive',
    message: message,
    position: 'top'
  })
}

const error = (message:string) => {
  Notify.create({
    type: 'negative',
    message: message,
    position: 'top'
  })
}

export default { success, error }