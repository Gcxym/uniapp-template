/**
 * @version 3.0.2
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: 2.7.9
 */
import Request from '@/common/luch-request/index.js'
import baseURL from '@/config'

const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = baseURL /* 根域名不同 */
	config.header = {
		...config.header,
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
		'Content-Type': 'application/json;charset=utf-8',
		'Authorization': uni.getStorageSync("SET_TOKEN") ? 'Bearer ' + uni.getStorageSync("SET_TOKEN") : ''
	}

	return config
}, (config) => {
	return Promise.reject(config)
})

// 必须使用异步函数，注意
http.interceptors.response.use(async (res) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	const code = res.data.code
	if (code === 401) {
		uni.showModal({
			title: "登录已过期",
			content: "登录已过期，请重新登录",
			showCancel: false,
			confirmText: "确定",
			success: res => {
				if (res.confirm) {
					store.dispatch('LogOut')
					uni.reLaunch({
						url: "/pages/login/login"
					});
				}
			}
		});
	} else if (code !== 200) {
		uni.showToast({
			title: res.data.msg,
			icon: 'none'
		})
		// return Promise.reject('error')
	}
	return res.data
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	return response
})

export default http
