import request from '@/utils/request'

// 修改密码
export function updateUserPwd(data){
	return request.put('/system/user/profile/updatePwd',data)
}

// 获取站点
export function webSite(){
	return request.get('')
}