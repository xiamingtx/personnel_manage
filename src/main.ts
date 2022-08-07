/*
 * @Description: Description of this file
 * @Version: 2.0
 * @Author: 夏明
 * @Date: 2022-08-06 12:07:59
 * @LastEditors: 夏明
 * @LastEditTime: 2022-08-07 21:52:06
 */
import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
// 引入pinia
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    Notify
  },
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
})

myApp.use(router)

myApp.use(createPinia())

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
