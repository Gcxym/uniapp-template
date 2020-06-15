import Vue from 'vue'
import App from './App'
import store from './store'
import  request from '@/utils/request' // 全局挂载引入，配置相关在该index.js文件里修改

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$http = request

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
