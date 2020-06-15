import request from '@/utils/request';

// 巡视任务列表
export function getAddressBook(data) {
	return request.get('/system/user/getAddressBook', { params: data })
}

// 通讯录个人信息
export function getUserInfo(data) {
	return request.get('/system/user/' + data)
}